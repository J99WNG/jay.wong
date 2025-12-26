  // Auto-update year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
  
  // Scroll to top
  document.querySelector(".back-to-top")?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );