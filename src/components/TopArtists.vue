<template>
  <div class="top-artist">
    <router-link
      v-for="item in list"
      :key="item.id"
      class="top-artist__item"
      :to="{ name: 'artist', params: { artistId: item.id } }"
    >
      <div class="top-artist__img">
        <img :src="item.src" alt="img" />
      </div>
      <div class="top-artist__name">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'TopArttist',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
