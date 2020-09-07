<template>
  <div class="artist">
    <div class="artist__header">
      <div class="artist__img">
        <img src="https://cdn-st1.rtr-vesti.ru/vh/pictures/xw/225/986/5.jpg" alt="img" />
      </div>
      <h1>Artist {{ artistId }}</h1>
    </div>
    <h2>Популярные треки</h2>
    <song-list :dataList="dataList" :isLoading="isLoading" @showmore="showMore" />
  </div>
</template>
<script>
import SongList from "@/components/SongList";
import getListMixin from "@/mixins/getListMixin";

export default {
  name: "Artist",

  components: {
    SongList,
  },

  mixins: [getListMixin],

  props: {
    artistId: {
      type: [String, Number],
      required: true,
    },
  },

  data: () => ({
    path: "/mock2.json", // REST api endpoint to artists songs
  }),

  created() {
    this.query.artistId = this.artistId;
    this.getList(); // See mixin
  },

  watch: {
    artistId() {
      this.dataList = [];
      this.query.page = 1;
      this.getList();
    },
  },
};
</script>
