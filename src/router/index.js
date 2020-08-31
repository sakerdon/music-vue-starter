import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Home from "@/views/Home";
import Category from "@/views/Category";
import PlayList from "@/views/PlayList";


export const constantRoutes = [
  {
    path: "/",
    component: Home,
  },

  {
    path: "/category",
    name: 'category',
    component: Category,
  },

  {
    path: "/playlist",
    name: 'playlist',
    component: PlayList,
  },

  
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;