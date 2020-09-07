<template>
  <div class="category">
    <div class="category__header">
      <div class="category__img">
        <img src="/svg/forest.svg" alt="img" />
      </div>
      <h1>Category {{ categoryId }}</h1>
    </div>

    <song-list :dataList="dataList" :isLoading="isLoading" @showmore="showMore" />
  </div>
</template>
<script>
import SongList from "@/components/SongList";
import getListMixin from "@/mixins/getListMixin";
export default {
  name: "Category",

  components: {
    SongList,
  },

  mixins: [getListMixin],

  props: {
    categoryId: {
      type: [String, Number],
      required: true,
    },
  },

  data: () => ({
    path: "/mock2.json", // REST api endpoint to category
  }),

  created() {
    this.query.categoryId = this.categoryId;
    this.getList(); // See mixin
  },

  watch: {
    categoryId() {
      this.dataList = [];
      this.query.page = 1;
      this.getList(); // See mixin
    },
  },
};
</script>
