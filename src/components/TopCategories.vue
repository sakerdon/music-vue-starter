<template>
  <div class="top-category">
    <router-link
      v-for="item in list"
      :key="item.id"
      class="top-category__item"
      :to="{ name: 'category', params: { categoryId: item.id } }"
    >
      <div class="top-category__img">
        <img :src="item.src" alt="img" />
      </div>
      <div class="top-category__name">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopCategory',

  data: () => ({
    list: [
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
    ],
  }),
};
</script>
