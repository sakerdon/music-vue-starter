<template>
  <form class="header__search" @submit.prevent="onsubmitSearch">
    <input v-model="term" type="text" class="header__input" placeholder="Поиск" />
    <button type="submit" class="header__submit">Найти</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    term: "",
  }),
  methods: {
    onsubmitSearch() {
      console.log(this.term);

      if (!this.term.trim()) {
        return; /* this.$router.push('/'); */
      }

      this.$router
        .push({
          name: "search",
          query: { term: this.term },
        })
        .catch(() => {});
    },
  },
};
</script>

<style></style>
