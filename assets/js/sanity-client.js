/* ===== CLIENTE SANITY (sin SDK, sin build tool) =====
   Hace fetch() directo a la API de consulta (GROQ) de Sanity. Solo lee
   contenido publicado, por eso no necesita ningún token/clave secreta. */

const CaplastCMS = (() => {
  const cfg = window.CAPLAST_SANITY;

  function queryUrl(groq, params) {
    const base = `https://${cfg.projectId}.api.sanity.io/v${cfg.apiVersion}/data/query/${cfg.dataset}`;
    const search = new URLSearchParams({query: groq});
    Object.entries(params || {}).forEach(([key, value]) => {
      search.set(`$${key}`, JSON.stringify(value));
    });
    return `${base}?${search.toString()}`;
  }

  async function fetchGroq(groq, params) {
    const res = await fetch(queryUrl(groq, params));
    if (!res.ok) throw new Error(`Sanity respondió ${res.status}`);
    const json = await res.json();
    return json.result;
  }

  const PRODUCTO_PROYECCION = `{
    "id": _id,
    nombre,
    "slug": slug.current,
    material,
    capacidadMl,
    colores,
    "imagenes": imagenes[]{"url": asset->url, alt},
    precioBase,
    stock,
    disponible,
    esCapsula,
    permiteSello,
    descripcionCorta,
    descripcionLarga,
    usos,
    destacado,
    orden,
    "categoria": categoria->{nombre, "slug": slug.current, orden},
    "tapasCompatibles": tapasCompatibles[]->{nombre, "clave": clave.current, precioBase}
  }`;

  async function getProductos() {
    return fetchGroq(
      `*[_type == "producto" && disponible == true] | order(categoria->orden asc, orden asc) ${PRODUCTO_PROYECCION}`
    );
  }

  async function getProductoPorSlug(slug) {
    const result = await fetchGroq(
      `*[_type == "producto" && slug.current == $slug][0] ${PRODUCTO_PROYECCION}`,
      {slug}
    );
    return result || null;
  }

  async function getTapas() {
    return fetchGroq(`*[_type == "tapaOpcion"]{nombre, "clave": clave.current, precioBase}`);
  }

  async function getSellos() {
    return fetchGroq(`*[_type == "selloOpcion"]{nombre, "clave": clave.current, precioBase}`);
  }

  async function getTramosPrecio() {
    const config = await fetchGroq(`*[_type == "configuracionPrecios"][0]{tramos}`);
    return (config && config.tramos) || [];
  }

  async function getConfigSitio() {
    return fetchGroq(`*[_type == "configuracionSitio"][0]`);
  }

  return {getProductos, getProductoPorSlug, getTapas, getSellos, getTramosPrecio, getConfigSitio};
})();
