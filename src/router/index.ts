import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import store from "@/store";
import { setCurrentItemiD } from "@/store/mutations";

import { getItem } from "@/utils/Storage";

import LoginPage from "@/pages/LoginPage.vue";
import DetailPage from "@/pages/DetailPage.vue";
import HTTP404 from "@/pages/HTTP404.vue";

import Minimal from "@/layouts/Minimal.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Minimal,
    children: [
      {
        path: "",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "list" */ "@/pages/ListPage.vue"),
        name: "list"
      }
    ],
    meta: {
      requireAuth: true,
      roles: ["admin"]
    }
  },

  {
    path: "/signin",
    component: Minimal,
    children: [
      {
        path: "",
        component: LoginPage,
        name: "login"
      }
    ]
  },

  {
    path: "/detail",
    component: Minimal,
    children: [
      {
        path: ":detailId",
        component: DetailPage,
        name: "detail",
        props: true,
        beforeEnter: (to, from, next) => {
          store.commit(setCurrentItemiD(to.params.detailId));
          next();
        }
      }
    ],
    meta: {
      requireAuth: true
    }
  },

  {
    path: "*",
    component: Minimal,
    children: [
      {
        path: "",
        component: HTTP404,
        name: "error"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== "detail" && store.state.currentItemId) {
    store.commit(setCurrentItemiD(undefined));
  }
  const AUTHENTICATED = getItem("SESSION");
  if (to.matched.find(record => record.meta.requireAuth)) {
    if (!AUTHENTICATED) {
      next({ name: "login" });
      return;
    }
  }

  if (to.fullPath.startsWith("/signin") && AUTHENTICATED) {
    next({ name: "list" });
    return;
  }

  next();
});

export default router;
