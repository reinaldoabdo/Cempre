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
      { path: "/cadastro", component: () => import("pages/IndexPage.vue") },
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
