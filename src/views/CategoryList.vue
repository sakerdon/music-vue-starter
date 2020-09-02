<template>
  <div class="category-list">
    <h1>Музыкальные подборки</h1>
    <top-categories :list="categoryList" />
  </div>
</template>
<script>
import TopCategories from '@/components/TopCategories';

export default {
  name: 'CategoryList',

  components: {
    TopCategories,
  },

  data() {
    return {
      page: 1,
      categoryList: [
        {
          id: 1,
          name: 'Рок',
          src: '/svg/electric-guitar.svg',
        },
        {
          id: 2,
          name: 'На природе',
          src: '/svg/forest.svg',
        },
        {
          id: 3,
          name: 'Романтика',
          src: '/svg/balloons.svg',
        },
        {
          id: 4,
          name: 'Для тренировок',
          src: '/svg/dumbbell.svg',
        },
        {
          id: 5,
          name: 'Клубная',
          src: '/svg/music-1.svg',
        },
        {
          id: 12,
          name: 'На природе',
          src: '/svg/forest.svg',
        },
        {
          id: 11,
          name: 'Рок',
          src: '/svg/electric-guitar.svg',
        },
        {
          id: 13,
          name: 'Романтика',
          src: '/svg/balloons.svg',
        },
        {
          id: 15,
          name: 'Клубная',
          src: '/svg/music-1.svg',
        },
        {
          id: 14,
          name: 'Для тренировок',
          src: '/svg/dumbbell.svg',
        },
      ],
      isLoading: true,
    };
  },
};
</script>
