'use client'

import React, { useEffect, useMemo, useRef } from 'react'

import { cn } from '@/lib/utils'

export type FluidOrbProps = React.ComponentProps<'div'> & {
  size?: number
  color?: string
  backgroundColor?: string
}

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;
uniform vec3 u_background;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.22;

  vec2 drift = vec2(
    sin(t) + 0.6 * sin(t * 1.7 + 1.3),
    cos(t * 0.8) + 0.6 * cos(t * 1.3 + 2.1)
  );

  vec2 p = vec2(uv.x * 1.8, uv.y * 1.0) + drift * 0.7;

  vec2 q = vec2(fbm(p + drift), fbm(p + vec2(3.2, 1.5) - drift));
  float f = fbm(p + 1.2 * q);

  float g = clamp(1.0 - uv.y, 0.0, 1.0);
  float anchor = smoothstep(0.0, 0.3, uv.y);
  float shade = clamp(g + (f - 0.5) * 0.8 * anchor, 0.0, 1.0);

  vec3 light = mix(u_background, u_color, 0.5);
  vec3 dark = u_color;

  vec3 col = u_background;
  col = mix(col, light, smoothstep(0.28, 0.52, shade));
  col = mix(col, dark, smoothstep(0.58, 0.88, shade));

  float edge = 1.0 - smoothstep(0.49, 0.5, distance(uv, vec2(0.5)));

  gl_FragColor = vec4(col * edge, edge);
}
`

function cssColorToRgb(
  color: string,
  container: HTMLElement,
): [number, number, number] {
  const probe = document.createElement('span')
  probe.style.color = color
  probe.style.position = 'absolute'
  probe.style.visibility = 'hidden'
  container.appendChild(probe)

  const resolvedColor = getComputedStyle(probe).color
  probe.remove()

  const sampler = document.createElement('canvas')
  sampler.width = 1
  sampler.height = 1
  const context = sampler.getContext('2d')
  if (!context) return [0.1, 0.45, 0.95]

  context.fillStyle = resolvedColor
  context.fillRect(0, 0, 1, 1)
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data

  return [red / 255, green / 255, blue / 255]
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const FluidOrb = ({
  size = 215,
  color = 'var(--color-accent-primary)',
  backgroundColor = 'var(--color-bg-tertiary)',
  className,
  style,
  ...props
}: FluidOrbProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const palette = useMemo(
    () => ({ color, backgroundColor }),
    [color, backgroundColor],
  )

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const gl = canvas.getContext('webgl', {
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })
    if (!gl) return

    const program = gl.createProgram()
    const vert = compile(gl, gl.VERTEX_SHADER, VERT)
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!program || !vert || !frag) return

    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const aPos = gl.getAttribLocation(program, 'a_pos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uColor = gl.getUniformLocation(program, 'u_color')
    const uBackground = gl.getUniformLocation(program, 'u_background')

    const updateColor = () => {
      gl.uniform3f(uColor, ...cssColorToRgb(palette.color, container))
      gl.uniform3f(
        uBackground,
        ...cssColorToRgb(palette.backgroundColor, container),
      )
      gl.drawArrays(gl.TRIANGLES, 0, 6)
    }

    updateColor()

    const themeObserver = new MutationObserver(updateColor)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pixels = Math.round(size * dpr)
    canvas.width = pixels
    canvas.height = pixels
    gl.viewport(0, 0, pixels, pixels)
    gl.uniform2f(uResolution, pixels, pixels)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0

    const render = (now: number) => {
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      raf = requestAnimationFrame(render)
    }
    render(start)

    return () => {
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.deleteBuffer(buffer)
    }
  }, [size, palette])

  return (
    <div
      ref={containerRef}
      data-slot="fluid-orb"
      className={cn('relative overflow-hidden rounded-full bg-bg-tertiary', className)}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...props}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

export default FluidOrb
