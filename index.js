alert("Hello there! This website is underconstruction");

/*text typing effect for name*/
const greetingEl = document.querySelector(".name");
const myNameEl = "KHOIRUL WAKIAH NASUTION";

function textTypingEffect(element, myNameEl, i = 0) {
  element.textContent += myNameEl[i]; // Use textContent instead of myNameContent

  if (i === myNameEl.length - 1) {
    return;
  }

  setTimeout(() => textTypingEffect(element, myNameEl, i + 1), 50);
}

textTypingEffect(greetingEl, myNameEl);

/* show the profession after 3 second page loaded*/
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    var prefessionEl = document.querySelector(".profession");
    prefessionEl.classList.remove("hidden"); // Remove the "hidden" class to make it visible
  }, 2000); // Adjust the time delay (in milliseconds) as needed
});

/*add reveal effect*/
window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var x = 0; x < reveals.length; x++) {
    var windowHeight = window.innerHeight;
    var revealTop = reveals[x].getBoundingClientRect().top;
    var revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveals[x].classList.add("active");
    } else {
      reveals[x].classList.remove("active");
    }
  }
}
