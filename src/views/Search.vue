<template>
  <div class="category">
    <h1>Поиск {{ query.term ? 'по ' + '"' + query.term + '"' : '' }}</h1>
    <song-list :dataList="dataList" :isLoading="isLoading" @showmore="showMore">
      <template #empty>Ничего не найдено :(</template>
    </song-list>
  </div>
</template>
<script>
import SongList from "@/components/SongList";
import getListMixin from "@/mixins/getListMixin";

export default {
  name: "Search",

  components: {
    SongList,
  },

  mixins: [getListMixin],

  data: () => ({
    path: "/mock2.json", // REST api endpoint to search
  }),

  watch: {
    "$route.query.term": {
      immediate: true,
      handler(value) {
        this.dataList = [];
        this.query.page = 1;
        this.query.term = value;
        this.getList(); // see mixin
      },
    },
  },
};
</script>
