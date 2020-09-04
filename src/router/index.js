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
    meta: { title: 'Слушать песню' },
    props: true,
  },

  {
    path: '/category/',
    name: 'categoryList',
    meta: { title: 'Категории' },
    component: CategoryList,
  },

  {
    path: '/category/:categoryId',
    name: 'category',
    // meta: { title: 'Категория' },
    component: Category,
    props: true,
  },

  {
    path: '/artist/',
    name: 'artistList',
    meta: { title: 'Исполнители' },
    component: ArtistList,
  },

  {
    path: '/artist/:artistId',
    name: 'artist',
    // meta: { title: 'Исполнитель' },
    component: Artist,
    props: true,
  },

  {
    path: '/playlist',
    name: 'playlist',
    meta: { title: 'Мой плейлист' },
    component: PlayList,
  },

  {
    path: '/search',
    name: 'search',
    meta: { title: 'Поиск' },
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

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'MyMuzz';
  next();
});

export default router;
