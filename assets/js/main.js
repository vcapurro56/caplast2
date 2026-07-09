/* ===== CONFIG ===== */
window.CAPLAST_WA_NUMBER = "56986071957";

/* Precios base reales (a tramo 5000+, incluye ajuste de escala de fabrica) */
window.CAPLAST_PRODUCTS = [
  { key: "capsula200cc", name: "Pote de Cápsula 200cc", base: 144 },
  { key: "capsula250cc", name: "Pote de Cápsula 250cc", base: 144 },
  { key: "apilable250cc", name: "Pote Apilable 250cc", base: 221},
  { key: "apilable500cc", name: "Pote Apilable 500cc", base: 292 },
  { key: "apilable650cc", name: "Pote Apilable 650cc", base: 298 },
  { key: "apilable1000cc", name: "Pote Apilable 1000cc", base: 320 },
];

window.CAPLAST_TIERS = [
  { min: 0, max: 100, mult: 2.0 },
  { min: 101, max: 500, mult: 1.5 },
  { min: 501, max: 1000, mult: 1.25 },
  { min: 1001, max: 4990, mult: 1.15 },
  { min: 4991, max: Infinity, mult: 1.0 },
];

/* Precios base de tapas y sello (editables, mismo ajuste por tramo de cantidad) */
window.CAPLAST_TAPAS = {
  none: { label: "Sin tapa", base: 0 },
  lisa: { label: "Tapa lisa", base: 122 },
  estriada: { label: "Tapa estriada", base: 122 },
  segurodenino: { label: "Tapa seguro de niño", base: 94 },
  dispensadora: { label: "Tapa cápsula dispensadora", base: 78 },
};
window.CAPLAST_SELLO = {
  none: { label: "Sin sello", base: 0 },
  con: { label: "Con sello", base: 71 },
};

/* Los potes de capsula (200cc y 250cc) usan tapas propias y no admiten sello */
window.CAPLAST_CAPSULA_KEYS = ["capsula200cc", "capsula250cc"];
window.CAPLAST_TAPAS_POR_TIPO = {
  capsula: ["none", "segurodenino", "dispensadora"],
  default: ["none", "lisa", "estriada"],
};

function caplastGetTier(qty) {
  return window.CAPLAST_TIERS.find(t => qty >= t.min && qty <= t.max) || window.CAPLAST_TIERS[0];
}
function caplastFormatCLP(n) {
  return "$" + Math.round(n).toLocaleString("es-CL");
}
function caplastWaLink(message) {
  return "https://wa.me/" + window.CAPLAST_WA_NUMBER + "?text=" + encodeURIComponent(message);
}

/* ===== NAV MOBILE ===== */
document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burger-btn");
  const navLinksEl = document.getElementById("nav-links");
  if (burgerBtn && navLinksEl) {
    burgerBtn.addEventListener("click", () => {
      burgerBtn.classList.toggle("open");
      navLinksEl.classList.toggle("open");
    });
    navLinksEl.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        burgerBtn.classList.remove("open");
        navLinksEl.classList.remove("open");
      });
    });
  }

  /* ===== REVEAL ON SCROLL ===== */
  const REVEAL_SELECTOR = ".feature-row, .section-head, .video-card, .prod-card, .uso-card, .benefit-card, .nosotros-card, .pricing, .contact-info, .contact-form";
  const revealEls = document.querySelectorAll(REVEAL_SELECTOR);
  revealEls.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ===== ACTIVE NAV LINK ===== */
  const navLinks = document.querySelectorAll(".nav-links a[href]");
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  navLinks.forEach(a => {
    try {
      const linkPath = new URL(a.href, window.location.origin).pathname.replace(/\/index\.html$/, "/");
      if (linkPath === currentPath) a.classList.add("active");
    } catch (e) {}
  });

  /* ===== CALCULATOR (si existe en la pagina) ===== */
  const calcProductSel = document.getElementById("calc-product");
  if (calcProductSel) {
    window.CAPLAST_PRODUCTS.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.key;
      opt.textContent = p.name;
      calcProductSel.appendChild(opt);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const preselect = urlParams.get("producto") || calcProductSel.dataset.preselect;
    if (preselect) calcProductSel.value = preselect;

    const qtyInput = document.getElementById("calc-qty");
    const tapaSel = document.getElementById("calc-tapa");
    const selloSel = document.getElementById("calc-sello");
    const unitEl = document.getElementById("calc-unit");
    const totalEl = document.getElementById("calc-total");
    const discountNote = document.getElementById("calc-discount-note");
    const waBtn = document.getElementById("calc-wa-btn");
    const quickBtns = document.querySelectorAll(".qty-quick button");
    const breakdownEnvase = document.getElementById("calc-breakdown-envase");
    const breakdownTapa = document.getElementById("calc-breakdown-tapa");
    const breakdownSello = document.getElementById("calc-breakdown-sello");
    const rowTapa = document.getElementById("calc-row-tapa");
    const rowSello = document.getElementById("calc-row-sello");
    const selloField = selloSel ? selloSel.closest(".calc-field") : null;

    function updateCalc() {
      const product = window.CAPLAST_PRODUCTS.find(p => p.key === calcProductSel.value);
      const esCapsula = product && window.CAPLAST_CAPSULA_KEYS.includes(product.key);

      if (tapaSel) {
        const tapaKeysValidas = window.CAPLAST_TAPAS_POR_TIPO[esCapsula ? "capsula" : "default"];
        const tapaValorPrevio = tapaSel.value;
        tapaSel.innerHTML = "";
        tapaKeysValidas.forEach(k => {
          const opt = document.createElement("option");
          opt.value = k;
          opt.textContent = window.CAPLAST_TAPAS[k].label;
          tapaSel.appendChild(opt);
        });
        tapaSel.value = tapaKeysValidas.includes(tapaValorPrevio) ? tapaValorPrevio : "none";
      }
      if (selloSel) {
        selloSel.disabled = esCapsula;
        if (esCapsula) selloSel.value = "none";
      }
      if (selloField) selloField.style.display = esCapsula ? "none" : "";

      const qty = parseInt(qtyInput.value) || 1;
      const tier = caplastGetTier(qty);

      const tapaKey = tapaSel ? tapaSel.value : "none";
      const selloKey = selloSel ? selloSel.value : "none";
      const tapa = window.CAPLAST_TAPAS[tapaKey];
      const sello = window.CAPLAST_SELLO[selloKey];

      const envaseUnit = Math.round(product.base * tier.mult);
      const tapaUnit = Math.round(tapa.base * tier.mult);
      const selloUnit = Math.round(sello.base * tier.mult);
      const unit = envaseUnit + tapaUnit + selloUnit;
      const total = unit * qty;

      unitEl.textContent = caplastFormatCLP(unit);
      totalEl.textContent = caplastFormatCLP(total);

      if (breakdownEnvase) breakdownEnvase.textContent = `Precio envase: ${caplastFormatCLP(envaseUnit)} / un`;
      if (rowTapa) rowTapa.style.display = tapaKey === "none" ? "none" : "flex";
      if (breakdownTapa && tapaKey !== "none") breakdownTapa.textContent = `Precio tapa (${tapa.label.toLowerCase()}): ${caplastFormatCLP(tapaUnit)} / un`;
      if (rowSello) rowSello.style.display = selloKey === "none" ? "none" : "flex";
      if (breakdownSello && selloKey !== "none") breakdownSello.textContent = `Precio sello: ${caplastFormatCLP(selloUnit)} / un`;

      if (discountNote) {
        discountNote.textContent = tier.mult < 2.0
          ? "\u2713 Descuento por volumen aplicado a tu pedido"
          : "Ingresa mas unidades para acceder a mejor precio por volumen";
      }
      if (waBtn) {
        const msg = `Hola, quiero cotizar envases Caplast. Me interesa el envase ${product.name}, en cantidad de ${qty} unidades. Quiero ${tapa.label.toLowerCase()} y ${sello.label.toLowerCase()}. El precio estimado que vi en la web fue de ${caplastFormatCLP(total)}.`;
        waBtn.href = caplastWaLink(msg);
      }
      quickBtns.forEach(b => b.classList.toggle("active", parseInt(b.dataset.qty) === qty));
    }

    calcProductSel.addEventListener("change", updateCalc);
    qtyInput.addEventListener("input", updateCalc);
    if (tapaSel) tapaSel.addEventListener("change", updateCalc);
    if (selloSel) selloSel.addEventListener("change", updateCalc);
    quickBtns.forEach(b => {
      b.addEventListener("click", () => {
        qtyInput.value = b.dataset.qty;
        updateCalc();
      });
    });
    updateCalc();
  }

  /* ===== WHATSAPP LINKS CON DATA-WA-MSG ===== */
  document.querySelectorAll("[data-wa-msg]").forEach(el => {
    el.href = caplastWaLink(el.dataset.waMsg);
  });

  /* ===== FORMSPREE AJAX (contacto) ===== */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(contactForm);
      const successEl = document.querySelector("[data-fs-success]");
      const submitBtn = contactForm.querySelector("[data-fs-submit-btn]");
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Enviando..."; }

      fetch(contactForm.action, {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      }).then(response => {
        if (response.ok) {
          contactForm.reset();
          if (successEl) successEl.classList.add("visible");
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Enviar cotizacion"; }
        } else {
          response.json().then(data => {
            if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Enviar cotizacion"; }
            alert("Hubo un problema al enviar. Por favor intenta de nuevo o escribenos por WhatsApp.");
          });
        }
      }).catch(() => {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Enviar cotizacion"; }
        alert("Hubo un problema al enviar. Por favor intenta de nuevo o escribenos por WhatsApp.");
      });
    });
  }
});
