function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const burger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  nav.classList.toggle("show");
  burger.classList.toggle("active");
  overlay.classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".footer-newsletter form");
  const popup = document.getElementById("popup");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        popup.style.display = "flex"; // Show popup

        // Auto-close with fade out after 3 sec
        setTimeout(() => {
          popup.classList.add("fade-out");
          setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove("fade-out");
          }, 400);
        }, 3000);
      } else {
        alert("⚠️ Oops! Something went wrong. Please try again.");
      }
    });
  }
});

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.style.display = "none";
    popup.classList.remove("fade-out");
  }, 400);
}
// === Header & Footer Loader ===
document.addEventListener("DOMContentLoaded", () => {
    // Load header
    fetch("header.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("header.html").innerHTML = data;
  
        // re-bind header JS after injection
        const burger = document.getElementById("hamburger");
        if (burger) {
          burger.addEventListener("click", toggleMenu);
        }
      });
  
    // Load footer
    fetch("footer.html")
      .then(res => res.text())
      .then(data => {
        document.getElementById("footer.html").innerHTML = data;
  
        // Newsletter form logic
        const form = document.querySelector(".footer-newsletter form");
        const popup = document.getElementById("popup");
  
        if (form) {
          form.addEventListener("submit", async function (e) {
            e.preventDefault();
            const formData = new FormData(form);
            const response = await fetch(form.action, {
              method: "POST",
              body: formData,
              headers: { Accept: "application/json" },
            });
  
            if (response.ok) {
              form.reset();
              popup.style.display = "flex"; // Show popup
  
              // Auto-close after 3s with fade-out
              setTimeout(() => {
                popup.classList.add("fade-out");
                setTimeout(() => {
                  popup.style.display = "none";
                  popup.classList.remove("fade-out");
                }, 400);
              }, 3000);
            } else {
              alert("⚠️ Oops! Something went wrong. Please try again.");
            }
          });
        }
      });
  });
  
  // === Menu Toggle ===
  function toggleMenu() {
    const nav = document.getElementById("navLinks");
    const burger = document.getElementById("hamburger");
    const overlay = document.getElementById("overlay");
  
    nav.classList.toggle("show");
    burger.classList.toggle("active");
    overlay.classList.toggle("show");
  }
  
  // === Close Popup (manual) ===
  function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("fade-out");
    setTimeout(() => {
      popup.style.display = "none";
      popup.classList.remove("fade-out");
    }, 400);
  }
  