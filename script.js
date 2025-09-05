function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const burger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  nav.classList.toggle("show");
  burger.classList.toggle("active");
  overlay.classList.toggle("show");
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.style.display = "none";
    popup.classList.remove("fade-out");
  }, 400);
}
// === Charger Header & Footer dynamiques ===
document.addEventListener("DOMContentLoaded", () => {
  // Charger le header
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // Réattacher le menu burger une fois le header chargé
      const burger = document.getElementById("hamburger");
      if (burger) {
        burger.addEventListener("click", toggleMenu);
      }
    });

  // Charger le footer
  fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer").innerHTML = data;

      // Attacher la logique newsletter une fois le footer chargé
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
            popup.style.display = "flex"; // Affiche le popup

            // Fermeture auto après 3 sec avec animation fade-out
            setTimeout(() => {
              popup.classList.add("fade-out");
              setTimeout(() => {
                popup.style.display = "none";
                popup.classList.remove("fade-out");
              }, 400);
            }, 3000);
          } else {
            alert("⚠️ Une erreur est survenue. Merci de réessayer.");
          }
        });
      }
    });
});

// === Menu Burger (mobile) ===
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  const burger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  nav.classList.toggle("show");
  burger.classList.toggle("active");
  overlay.classList.toggle("show");
}

// === Fermer le popup newsletter manuellement ===
function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("fade-out");
  setTimeout(() => {
    popup.style.display = "none";
    popup.classList.remove("fade-out");
  }, 400);
}
// === Effet sticky header ===
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
// === Swiper Partenaires ===
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".partners-swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      600: { slidesPerView: 2 },
      900: { slidesPerView: 3 }
    }
  });
});
