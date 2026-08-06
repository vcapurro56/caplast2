/* ===== DATOS DE RESPALDO =====
   Solo se usan si Sanity todavía no está configurado (projectId de ejemplo)
   o si la petición falla (sin internet, CMS caído). Así la web nunca queda
   en blanco. Una vez conectado el CMS, todo esto se reemplaza por datos reales. */
const CAPLAST_FALLBACK = {
  tramos: [
    {minimo: 0, maximo: 100, multiplicador: 2.0},
    {minimo: 101, maximo: 500, multiplicador: 1.5},
    {minimo: 501, maximo: 1000, multiplicador: 1.25},
    {minimo: 1001, maximo: 4990, multiplicador: 1.15},
    {minimo: 4991, maximo: null, multiplicador: 1.0},
  ],
  productos: [
    {slug: "envase-hdpe-200cc", nombre: "Pote de Cápsula 200cc", categoria: {nombre: "Potes de cápsula", slug: "potes-de-capsula"}, orden: 0,
      material: "HDPE", capacidadMl: 200, colores: [], imagenes: [{url: "/assets/img/capsula200.jpg"}],
      descripcionCorta: "Ideal para cápsulas, suplementos, muestras o productos compactos que necesitan una presentación práctica y profesional.",
      descripcionLarga: "El envase HDPE 200cc es la opción perfecta para quienes están comenzando a vender: cápsulas, muestras de producto, cremas concentradas o formatos de prueba.",
      usos: ["Cápsulas", "Cremas", "Muestras", "Cosmetica"],
      precioBase: 144, esCapsula: true, permiteSello: false,
      tapasCompatibles: [{clave: "segurodenino", nombre: "Tapa seguro de niño", precioBase: 94}, {clave: "dispensadora", nombre: "Tapa cápsula dispensadora", precioBase: 78}]},
    {slug: "pote-capsula-250cc", nombre: "Pote de Cápsula 250cc", categoria: {nombre: "Potes de cápsula", slug: "potes-de-capsula"}, orden: 1,
      material: "HDPE", capacidadMl: 250, colores: [{nombre: "Negro"}], imagenes: [{url: "/assets/img/negro250.jpg"}],
      descripcionCorta: "Formato práctico para cápsulas y productos pequeños, con una presentación diferenciada y compacta en color negro.",
      descripcionLarga: "Formato práctico para cápsulas y productos pequeños, con una presentación diferenciada y compacta en color negro. Ideal para emprendedores que necesitan un formato distintivo, sólido y con buena presencia frente al cliente final.",
      usos: ["Cápsulas", "Suplementos", "Muestras"],
      precioBase: 144, esCapsula: true, permiteSello: false,
      tapasCompatibles: [{clave: "segurodenino", nombre: "Tapa seguro de niño", precioBase: 94}, {clave: "dispensadora", nombre: "Tapa cápsula dispensadora", precioBase: 78}]},
    {slug: "envase-hdpe-250cc", nombre: "Pote Apilable 250cc", categoria: {nombre: "Potes apilables", slug: "potes-apilables"}, orden: 0,
      material: "HDPE", capacidadMl: 250, colores: [], imagenes: [{url: "/assets/img/pote250.jpg"}],
      descripcionCorta: "Ideal para cremas, cosmética, alimentos secos y productos de menor tamaño.",
      descripcionLarga: "El envase HDPE 250cc es uno de los formatos más versatiles de nuestro catálogo. Práctico para emprendedores que están lanzando su primera linea de productos.",
      usos: ["Cosmetica", "Peluqueria", "Cremas", "Marcas propias"],
      precioBase: 221, esCapsula: false, permiteSello: true,
      tapasCompatibles: [{clave: "lisa", nombre: "Tapa lisa", precioBase: 122}, {clave: "estriada", nombre: "Tapa estriada", precioBase: 122}]},
    {slug: "envase-hdpe-500cc", nombre: "Pote Apilable 500cc", categoria: {nombre: "Potes apilables", slug: "potes-apilables"}, orden: 1,
      material: "HDPE", capacidadMl: 500, colores: [], imagenes: [{url: "/assets/img/pote500.jpg"}],
      descripcionCorta: "Versátil para cosmética, suplementos, alimentos secos y productos capilares.",
      descripcionLarga: "Un formato versatil para emprendedores y empresas que necesitan una presentación resistente, práctica y profesional. Ideal para cosmetica, suplementos, productos capilares, alimentos secos, proteínas y productos de limpieza.",
      usos: ["Cosmetica", "Suplementos", "Alimentos secos", "Limpieza", "Capilares"],
      precioBase: 292, esCapsula: false, permiteSello: true,
      tapasCompatibles: [{clave: "lisa", nombre: "Tapa lisa", precioBase: 122}, {clave: "estriada", nombre: "Tapa estriada", precioBase: 122}]},
    {slug: "envase-hdpe-650cc", nombre: "Pote Apilable 650cc", categoria: {nombre: "Potes apilables", slug: "potes-apilables"}, orden: 2,
      material: "HDPE", capacidadMl: 650, colores: [], imagenes: [{url: "/assets/img/pote650.jpg"}],
      descripcionCorta: "Buena opción para productos de mayor volumen con presentación profesional.",
      descripcionLarga: "Cuando tu producto necesita más espacio sin perder practicidad, el envase HDPE 650cc es la eleccion adecuada. Pensado para marcas que ya validaron su producto y buscan ofrecer formatos de mayor rendimiento.",
      usos: ["Suplementos", "Proteínas", "Alimentos secos", "Limpieza"],
      precioBase: 298, esCapsula: false, permiteSello: true,
      tapasCompatibles: [{clave: "lisa", nombre: "Tapa lisa", precioBase: 122}, {clave: "estriada", nombre: "Tapa estriada", precioBase: 122}]},
    {slug: "envase-hdpe-1000cc", nombre: "Pote Apilable 1000cc", categoria: {nombre: "Potes apilables", slug: "potes-apilables"}, orden: 3,
      material: "HDPE", capacidadMl: 1000, colores: [], imagenes: [{url: "/assets/img/litro1.jpg"}],
      descripcionCorta: "Formato ideal para reposición, venta mayorista o productos de alto consumo.",
      descripcionLarga: "El envase HDPE de 1 litro esta pensado para venta mayorista, reposición frecuente o productos de alto consumo. Resistente, apilable y con una presentación que transmite volumen y valor al cliente final.",
      usos: ["Proteínas", "Suplementos", "Alimentos secos", "Marcas propias"],
      precioBase: 320, esCapsula: false, permiteSello: true,
      tapasCompatibles: [{clave: "lisa", nombre: "Tapa lisa", precioBase: 122}, {clave: "estriada", nombre: "Tapa estriada", precioBase: 122}]},
  ],
  sellos: [{clave: "con", nombre: "Con sello", precioBase: 71}],
  config: {whatsappNumero: "56986071957"},
};

window.CAPLAST_DATA = null; // se llena en cargarDatosCaplast()

async function cargarDatosCaplast() {
  try {
    const [productos, tapas, sellos, tramos, config] = await Promise.all([
      CaplastCMS.getProductos(),
      CaplastCMS.getTapas(),
      CaplastCMS.getSellos(),
      CaplastCMS.getTramosPrecio(),
      CaplastCMS.getConfigSitio(),
    ]);
    if (!productos || productos.length === 0) throw new Error("Sin productos en el CMS todavía");
    window.CAPLAST_DATA = {
      productos,
      tapas: tapas || [],
      sellos: sellos || [],
      tramos: tramos && tramos.length ? tramos : CAPLAST_FALLBACK.tramos,
      config: config || CAPLAST_FALLBACK.config,
    };
  } catch (err) {
    console.warn("[Caplast] No se pudo cargar el CMS, usando datos de respaldo.", err);
    window.CAPLAST_DATA = CAPLAST_FALLBACK;
  }
}

function caplastGetTier(qty) {
  const tramos = window.CAPLAST_DATA.tramos;
  return (
    tramos.find((t) => qty >= t.minimo && (t.maximo == null || qty <= t.maximo)) || tramos[0]
  );
}
function caplastFormatCLP(n) {
  return "$" + Math.round(n).toLocaleString("es-CL");
}
function caplastWaLink(message) {
  const numero = window.CAPLAST_DATA.config.whatsappNumero || CAPLAST_FALLBACK.config.whatsappNumero;
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);
}
function caplastImagenUrl(producto) {
  return producto.imagenes && producto.imagenes[0] ? producto.imagenes[0].url : "";
}

/* ===== TARJETAS DE PRODUCTO (catálogo y destacados) ===== */
function caplastProductCardHtml(p) {
  return `
    <div class="prod-card">
      <a href="/productos/${p.slug}/" style="text-decoration:none; color:inherit;">
        <div class="prod-img"><img src="${caplastImagenUrl(p)}" alt="${p.nombre}"></div>
        <div class="prod-body">
          <h3>${p.nombre}</h3>
          <p class="prod-cap"><strong>Capacidad:</strong> ${p.capacidadMl} cc<br>${p.descripcionCorta || ""}</p>
        </div>
      </a>
      <div class="prod-body" style="border-top:none; padding-top:0;">
        <div class="prod-ctas">
          <a class="cta-calc" href="/productos/${p.slug}/">Ver producto</a>
        </div>
      </div>
    </div>`;
}

function caplastRelatedCardHtml(p) {
  return `
    <a class="prod-card" href="/productos/${p.slug}/">
      <div class="prod-img"><img src="${caplastImagenUrl(p)}" alt="${p.nombre}"></div>
      <div class="prod-body">
        <h4>${p.nombre}</h4>
        <p class="prod-cap">${p.capacidadMl} cc</p>
      </div>
    </a>`;
}

function caplastRenderGrids() {
  const productos = window.CAPLAST_DATA.productos;

  document.querySelectorAll("[data-cms-grid]").forEach((el) => {
    const categoriaSlug = el.dataset.categoriaSlug;
    const soloDestacados = el.dataset.destacado === "true";
    let lista = productos;
    if (categoriaSlug) lista = lista.filter((p) => p.categoria && p.categoria.slug === categoriaSlug);
    if (soloDestacados) lista = lista.filter((p) => p.destacado);
    lista = [...lista].sort((a, b) => (a.orden || 0) - (b.orden || 0));
    el.innerHTML = lista.map(caplastProductCardHtml).join("");
  });

  document.querySelectorAll("[data-cms-related]").forEach((el) => {
    const excludeSlug = el.dataset.excludeSlug;
    const relacionados = productos.filter((p) => p.slug !== excludeSlug).slice(0, 4);
    el.innerHTML = relacionados.map(caplastRelatedCardHtml).join("");
  });
}

/* ===== HIDRATACIÓN DE PÁGINA DE DETALLE DE PRODUCTO ===== */
function caplastHydrateProductPage() {
  const slug = document.body.dataset.productSlug;
  if (!slug) return;
  const producto = window.CAPLAST_DATA.productos.find((p) => p.slug === slug);
  if (!producto) return;

  const setText = (field, value) => {
    const el = document.querySelector(`[data-cms-field="${field}"]`);
    if (el) el.textContent = value;
  };
  const setHtml = (field, value) => {
    const el = document.querySelector(`[data-cms-field="${field}"]`);
    if (el) el.innerHTML = value;
  };

  setText("nombre", producto.nombre);
  setText("categoria", producto.categoria ? producto.categoria.nombre : "");
  setHtml(
    "specs",
    `<strong>Capacidad:</strong> ${producto.capacidadMl} cc &nbsp;|&nbsp; <strong>Material:</strong> ${producto.material}` +
      (producto.colores && producto.colores.length === 1 ? ` &nbsp;|&nbsp; <strong>Color:</strong> ${producto.colores[0].nombre}` : "")
  );
  setText("descripcion", producto.descripcionLarga || producto.descripcionCorta || "");

  const imgEl = document.querySelector('[data-cms-field="imagen"]');
  if (imgEl) {
    imgEl.src = caplastImagenUrl(producto);
    imgEl.alt = producto.nombre;
  }

  const tagsEl = document.querySelector('[data-cms-field="tags"]');
  if (tagsEl && producto.usos) {
    tagsEl.innerHTML = producto.usos
      .map((u) => `<span style="display:inline-block; background:var(--blanco); border:1px solid #E0DACB; color:var(--azul); font-size:12.5px; font-weight:600; padding:6px 14px; border-radius:20px; margin:0 6px 8px 0;">${u}</span>`)
      .join("");
  }

  const calcLink = document.querySelector('[data-cms-field="calc-link"]');
  if (calcLink) calcLink.href = `/calculadora/?producto=${producto.slug}`;

  document.querySelectorAll("[data-wa-msg-cms]").forEach((el) => {
    el.dataset.waMsg = el.dataset.waMsgCms.replace(/\{\{producto\}\}/g, producto.nombre);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await cargarDatosCaplast();
  caplastRenderGrids();
  caplastHydrateProductPage();

  /* ===== NAV MOBILE ===== */
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
  const REVEAL_SELECTOR = ".feature-row, .section-head, .video-card, .prod-card, .uso-card, .benefit-card, .nosotros-card, .pricing, .contact-info, .contact-form, .hero-stat";
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
    window.CAPLAST_DATA.productos.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.slug;
      opt.textContent = p.nombre;
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

    const SIN_TAPA = {clave: "none", nombre: "Sin tapa", precioBase: 0};
    const SIN_SELLO = {clave: "none", nombre: "Sin sello", precioBase: 0};

    function updateCalc() {
      const product = window.CAPLAST_DATA.productos.find(p => p.slug === calcProductSel.value);
      if (!product) return;

      const opcionesTapa = [SIN_TAPA, ...(product.tapasCompatibles || [])];

      if (tapaSel) {
        const tapaValorPrevio = tapaSel.value;
        tapaSel.innerHTML = "";
        opcionesTapa.forEach(t => {
          const opt = document.createElement("option");
          opt.value = t.clave;
          opt.textContent = t.nombre;
          tapaSel.appendChild(opt);
        });
        tapaSel.value = opcionesTapa.some(t => t.clave === tapaValorPrevio) ? tapaValorPrevio : "none";
      }
      if (selloSel) {
        selloSel.disabled = !product.permiteSello;
        if (!product.permiteSello) selloSel.value = "none";
      }
      if (selloField) selloField.style.display = product.permiteSello ? "" : "none";

      const qty = parseInt(qtyInput.value) || 1;
      const tier = caplastGetTier(qty);

      const tapaKey = tapaSel ? tapaSel.value : "none";
      const selloKey = selloSel ? selloSel.value : "none";
      const tapa = opcionesTapa.find(t => t.clave === tapaKey) || SIN_TAPA;
      const sello = selloKey === "none" ? SIN_SELLO : (window.CAPLAST_DATA.sellos.find(s => s.clave === selloKey) || SIN_SELLO);

      const envaseUnit = Math.round(product.precioBase * tier.multiplicador);
      const tapaUnit = Math.round(tapa.precioBase * tier.multiplicador);
      const selloUnit = Math.round(sello.precioBase * tier.multiplicador);
      const unit = envaseUnit + tapaUnit + selloUnit;
      const total = unit * qty;

      unitEl.textContent = caplastFormatCLP(unit);
      totalEl.textContent = caplastFormatCLP(total);

      if (breakdownEnvase) breakdownEnvase.textContent = `Precio envase: ${caplastFormatCLP(envaseUnit)} / un`;
      if (rowTapa) rowTapa.style.display = tapaKey === "none" ? "none" : "flex";
      if (breakdownTapa && tapaKey !== "none") breakdownTapa.textContent = `Precio tapa (${tapa.nombre.toLowerCase()}): ${caplastFormatCLP(tapaUnit)} / un`;
      if (rowSello) rowSello.style.display = selloKey === "none" ? "none" : "flex";
      if (breakdownSello && selloKey !== "none") breakdownSello.textContent = `Precio sello: ${caplastFormatCLP(selloUnit)} / un`;

      if (discountNote) {
        discountNote.textContent = tier.multiplicador < 2.0
          ? "✓ Descuento por volumen aplicado a tu pedido"
          : "Ingresa mas unidades para acceder a mejor precio por volumen";
      }
      if (waBtn) {
        const msg = `Hola, quiero cotizar envases Caplast. Me interesa el envase ${product.nombre}, en cantidad de ${qty} unidades. Quiero ${tapa.nombre.toLowerCase()} y ${sello.nombre.toLowerCase()}. El precio estimado que vi en la web fue de ${caplastFormatCLP(total)}.`;
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
