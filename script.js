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

// EmailJS Configuration
emailjs.init("qvHscRthrfKPTKZw4");

// Contact form functionality
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      submitBtn.disabled = true;
      btnText.style.display = "none";
      btnLoading.style.display = "inline";

      // Get form data
      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get("from_name"),
        from_email: formData.get("from_email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        to_email: "khoirul.wana@gmail.com",
      };

      // Send email using EmailJS
      emailjs
        .send("service_63ykthi", "template_j9mfy7j", templateParams)
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            showNotification(
              "Message sent successfully! I'll get back to you soon.",
              "success"
            );
            contactForm.reset();
          },
          function (error) {
            console.log("EmailJS Error:", error);
            showNotification(
              "Failed to send message. Please try again or contact me directly.",
              "error"
            );
          }
        )
        .finally(function () {
          // Reset button state
          submitBtn.disabled = false;
          btnText.style.display = "inline";
          btnLoading.style.display = "none";
        });
    });
  }

  // Scroll reveal animations
  const attachReveal = (selector, extraClass = "fade-up") => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add("reveal", extraClass);
    });
  };

  attachReveal(".summary");
  attachReveal(".core-competencies");
  attachReveal(".soft-skills");
  attachReveal(".languages");
  attachReveal(".frontend");
  attachReveal(".backend");
  attachReveal(".database");
  attachReveal(".platforms");
  attachReveal(".experiences");
  attachReveal(".educations");
  attachReveal(".stats-row");
  attachReveal(".section-divider", "fade-up");
  attachReveal(".project .card");
  attachReveal(".project article");

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // Home page on-load animation
  const homeSection = document.getElementById("home");
  if (homeSection) {
    const homeIntro = homeSection.querySelector(".intro");
    const homeAvatar = homeSection.querySelector(".profile-pic");
    const homeIllustration = homeSection.querySelector(".illustration");

    if (homeIntro) homeIntro.classList.add("home-onload-target");
    if (homeAvatar) homeAvatar.classList.add("home-onload-target");
    if (homeIllustration) homeIllustration.classList.add("home-onload-target");

    // ensure styles applied after initial render
    requestAnimationFrame(() => {
      document.body.classList.add("home-onload-start");
      // allow transition to complete before cleaning up
      setTimeout(() => {
        document.body.classList.remove("home-onload-start");
        homeSection
          .querySelectorAll(".home-onload-target")
          .forEach((el) => el.classList.remove("home-onload-target"));
      }, 900);
    });
  }

  // Smooth scroll for navbar
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Scroll so section is at the very top, considering fixed header
          const headerHeight = document.getElementById("header").offsetHeight;
          const sectionTop =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            20;
          window.scrollTo({
            top: Math.max(0, sectionTop),
            behavior: "smooth",
          });
        }
      }
    });
  });

  // GitHub Stats loading and error handling
  const statsImages = document.querySelectorAll(".stats-card img");
  statsImages.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
      // Remove loading animation from parent card
      const card = this.closest(".stats-card");
      if (card) {
        card.style.setProperty("--loading-complete", "1");
      }
    });

    img.addEventListener("error", function () {
      this.style.display = "none";
      const card = this.closest(".stats-card");
      if (card) {
        card.style.setProperty("--loading-complete", "1");
      }
      const errorDiv = document.createElement("div");
      errorDiv.className = "stats-error";
      errorDiv.innerHTML = `
        <div style="
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          color: var(--clr-light-a50);
          font-style: italic;
          background: var(--clr-surface-a20);
          border-radius: 8px;
          border: 2px dashed var(--clr-surface-a30);
        ">
          <span>📊 Stats temporarily unavailable</span>
        </div>
      `;
      this.parentNode.appendChild(errorDiv);
    });

    // Set initial opacity for smooth loading
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });

  // Scrollspy: highlight navbar link on scroll (throttled for performance)
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  let ticking = false;
  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerEl.offsetHeight - 10;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
    }
  });
});

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notification if any
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  const backgroundColor =
    type === "success" ? "#22946e" : type === "error" ? "#9c2121" : "#21498a";

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${backgroundColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-weight: 500;
    max-width: 300px;
    animation: slideIn 0.3s ease-out;
  `;

  // Add animation keyframes
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Add to page
  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

function toggleExperience(header) {
  const container = header.parentElement;
  container.classList.toggle("active");
}

function toggleEducation(header) {
  const container = header.parentElement;
  container.classList.toggle("active");
}
