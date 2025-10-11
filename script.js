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

function attachMenuToggleListeners() {
  const burger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  [burger, overlay].forEach(element => {
    if (!element) return;
    element.removeEventListener("click", toggleMenu);
    element.addEventListener("click", toggleMenu);
  });
}
// === Charger Header & Footer dynamiques ===
document.addEventListener("DOMContentLoaded", () => {
  // Charger le header
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;

      // Réattacher le menu burger une fois le header chargé

      attachMenuToggleListeners();
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
  if (typeof Swiper !== "undefined" && document.querySelector(".partners-swiper")) {
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
      navigation: {
        nextEl: ".partners-swiper .swiper-button-next",
        prevEl: ".partners-swiper .swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 3 }
      }
    });
  }
});
// Flip cards on click
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".skill-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.add("no-hover");
      card.classList.toggle("flip");

      const removeNoHover = () => {
        card.classList.remove("no-hover");
      };

      card.addEventListener("mouseleave", removeNoHover, { once: true });
    });
  });
});
// Team carousel with arrows
new Swiper(".team-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 2500, disableOnInteraction: false },
  pagination: { el: ".team-swiper .swiper-pagination", clickable: true },
  navigation: {
    nextEl: ".team-swiper .swiper-button-next",
    prevEl: ".team-swiper .swiper-button-prev",
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    600: { slidesPerView: 2 },
    900: { slidesPerView: 3 }
  }
});

// === Portfolio filter (fade + collapse + event delegation) ===
(function initPortfolioFilter() {
  const DURATION = 400; // keep in sync with CSS 0.4s
  const filters = document.querySelector(".portfolio-filters");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  if (!filters || cards.length === 0) return;

  // helper
  const show = (el) => {
    if (el.style.display === "none") {
      el.style.display = "";        // restore flow
      // force reflow to enable transition
      // eslint-disable-next-line no-unused-expressions
      el.offsetWidth;
    }
    el.classList.remove("hide");
    el.removeAttribute("aria-hidden");
  };
  const hide = (el) => {
    if (!el.classList.contains("hide")) {
      el.classList.add("hide");
      el.setAttribute("aria-hidden", "true");
      setTimeout(() => { el.style.display = "none"; }, DURATION);
    }
  };

  // delegated clicks (works even if buttons are re-rendered)
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    // active state
    filters.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = (btn.dataset.filter || "all").toLowerCase();

    cards.forEach(card => {
      const cats = (card.dataset.category || "").toLowerCase().split(/\s+/);
      const match = filter === "all" || cats.includes(filter);
      match ? show(card) : hide(card);
    });
  });
})();


  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Active button state
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter").toLowerCase();

      projects.forEach(project => {
        const cats = (project.dataset.category || "")
          .toLowerCase()
          .split(/\s+/); // e.g. "afrique softskills 2024"

        const match = (filter === "all") || cats.includes(filter);

        if (match) showCard(project);
        else hideCard(project);
      });
    });
  });

// ==== Actions en cours (index only) ====
document.addEventListener("DOMContentLoaded", async () => {
  const section = document.getElementById("actions-en-cours");
  const grid = document.getElementById("actionsGrid");
  if (!section || !grid) return;

  try {
    const res = await fetch("actions.json", { cache: "no-store" });
    if (!res.ok) throw new Error("actions.json not found");
    const items = await res.json();

    const today = new Date();
    const active = (items || []).filter(it => {
      const statutOk = (it.statut || "").toLowerCase() === "en_cours";
      const fin = it.date_fin ? new Date(it.date_fin) : null;
      const dateOk = fin ? fin >= new Date(today.toDateString()) : false; // keep ongoing if end date in future
      return statutOk || dateOk;
    });

    if (!active.length) return; // keep section hidden

    // Build cards
    const cardHTML = active.map((it, idx) => `
      <article class="action-card" data-aos="zoom-in" ${idx ? `data-aos-delay="${idx*100}"` : ""}>
        <div class="thumb">
          <img src="${it.image || 'images/placeholder.jpg'}" alt="${it.titre || 'Action'}">
        </div>
        <div class="info">
          <h3>${it.titre || ''}</h3>
          <p class="meta">
            <span><i class="fas fa-map-marker-alt"></i> ${it.lieu || ''}</span>
            ${it.date_debut || it.date_fin ? `<span><i class="fas fa-calendar"></i> ${it.date_debut || ''}${it.date_fin ? ` → ${it.date_fin}` : ''}</span>` : ``}
          </p>
          <p class="desc">${it.description_courte || ''}</p>
          ${it.lien ? `<a class="btn-secondary" href="${it.lien}">En savoir plus</a>` : ``}
        </div>
      </article>
    `).join("");

    grid.innerHTML = cardHTML;
    section.classList.remove("hidden"); // reveal
  } catch (e) {
    // Silent fail: if actions.json missing or invalid, keep the section hidden
    // console.warn("No actions loaded", e);
  }
});
