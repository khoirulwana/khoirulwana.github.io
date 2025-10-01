// Sticky header on scroll
// Menambahkan class 'scrolled' pada header jika scrollY > 100px
const headerEl = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    // scroll lebih dari 100px
    headerEl.classList.add("scrolled");
  } else {
    headerEl.classList.remove("scrolled");
  }
});
