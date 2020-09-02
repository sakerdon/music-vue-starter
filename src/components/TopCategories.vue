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
  name: 'TopCategories',

  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
