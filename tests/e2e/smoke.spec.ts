import { expect, test } from '@playwright/test';

const routes = [
  { path: '/', heading: /Solving digital complexity through/i },
  { path: '/bp-genai', heading: 'Shifting IT Support Left at Enterprise Scale' },
  { path: '/bp-workplace', heading: 'From Fragmented Intranets to a Unified Global Digital Workplace' },
  { path: '/cs-kyc', heading: 'Reimagining How 1,140 Relationship Managers Start Their Day' },
  { path: '/dai-pai-dong', heading: 'Bringing Order to Chaos Without Losing the Dai Pai Dong Spirit' },
  { path: '/mathsgenie', heading: 'Relaunching MathsGenie to 242,000 Students' },
] as const;

for (const route of routes) {
  test(`${route.path} renders its page shell`, async ({ page }) => {
    const response = await page.goto(route.path);

    expect(response?.ok()).toBe(true);
    await expect(page.getByRole('heading', { level: 1, name: route.heading })).toBeVisible();

    const mainNavigation = page.getByRole('navigation', { name: 'Main navigation' });
    if ((page.viewportSize()?.width ?? 0) < 640) {
      const menuButton = page.getByRole('button', { name: 'Open menu' });
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute('aria-controls', 'nav-primary');
      await menuButton.click();
      await expect(mainNavigation).toBeVisible();
    } else {
      await expect(mainNavigation).toBeVisible();
    }

    await expect(page.getByRole('contentinfo')).toBeAttached();
  });
}

test('theme preference survives a reload', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: /Theme: system\. Switch to light theme/i }).click();
  await expect(page.locator('html')).toHaveClass(/light/);

  await page.reload();
  await expect(page.locator('html')).toHaveClass(/light/);
});

test('a case-study figure opens and closes in the lightbox', async ({ page }) => {
  await page.goto('/mathsgenie');

  await page.getByRole('button', { name: /^View full size:/i }).first().click();
  await expect(page.locator('dialog[open]')).toBeVisible();
  await page.getByRole('button', { name: 'Close gallery' }).click();
  await expect(page.locator('dialog[open]')).toHaveCount(0);
});
