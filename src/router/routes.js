const routes = [
  {
    path: "/",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/PagLogin.vue") },
      { path: "/login", component: () => import("pages/PagLogin.vue") },
    ],
    meta: { transition: "slide-left" },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: `/cadastro/:cnpj`,
        component: () => import("pages/PagCadastro.vue"),
      },
    ],
    meta: { transition: "slide-left" },
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: `/convites`,
        component: () => import("pages/PagConvites.vue"),
      },
    ],
    meta: { transition: "slide-left" },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
    meta: { transition: "slide-left" },
  },
];

export default routes;
