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
