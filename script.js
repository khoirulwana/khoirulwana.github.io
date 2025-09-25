const headerEl = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    // scroll lewat 50px
    headerEl.classList.add("scrolled");
  } else {
    headerEl.classList.remove("scrolled");
  }
});
