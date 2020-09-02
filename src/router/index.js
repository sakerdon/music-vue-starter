import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Home from '@/views/Home';
import CategoryList from '@/views/CategoryList';
import Category from '@/views/Category';
import Artist from '@/views/Artist';
import ArtistList from '@/views/ArtistList';
import PlayList from '@/views/PlayList';
import Search from '@/views/Search';
import Track from '@/views/Track';

export const constantRoutes = [
  {
    path: '/',
    component: Home,
  },

  {
    path: '/track/:trackId',
    name: 'track',
    component: Track,
    props: true,
  },

  {
    path: '/category/',
    name: 'categoryList',
    component: CategoryList,
  },

  {
    path: '/category/:categoryId',
    name: 'category',
    component: Category,
    props: true,
  },

  {
    path: '/artist/',
    name: 'artistList',
    component: ArtistList,
  },

  {
    path: '/artist/:artistId',
    name: 'artist',
    component: Artist,
    props: true,
  },

  {
    path: '/playlist',
    name: 'playlist',
    component: PlayList,
  },

  {
    path: '/search',
    name: 'search',
    component: Search,
    props: true,
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
