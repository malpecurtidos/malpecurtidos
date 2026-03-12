import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("nosotros", "routes/nosotros.tsx"),
  route("productos", "routes/productos.tsx"),
  route("productos/:id", "routes/productos.$id.tsx"),
  route("showroom", "routes/showroom.tsx"),
  route("showroom/:id", "routes/showroom.$id.tsx"),
  route("contacto", "routes/contacto.tsx"),
  route("aviso-de-privacidad", "routes/aviso-de-privacidad.tsx"),
  route("terminos-y-condiciones", "routes/terminos-y-condiciones.tsx"),
  route("blog", "routes/blog.list.tsx"),
  route("blog/:slug", "routes/blog.post.tsx"),
  route("api/request", "routes/api.request.tsx"),
  route("api/quotation", "routes/api.quotation.tsx"),
  route("api/contact", "routes/api.contact.tsx"),
  route("api/showroom", "routes/api.showroom.tsx"),
] satisfies RouteConfig;
