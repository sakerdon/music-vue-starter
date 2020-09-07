<template>
  <div class="artist">
    <div class="artist__header">
      <div class="artist__img">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3M-igcgAWxxG6nOgJDzLtGqQz7FlJW2IZ6w&usqp=CAU"
          alt="img"
        />
      </div>
      <h1>{{ track.title }}</h1>
    </div>
    <song-list :dataList="[track]" :isLoading="isLoading" hideShowMore />

    <h2>Похожие треки</h2>
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

  props: {
    trackId: {
      type: [String, Number],
      required: true,
    },
  },

  mixins: [getListMixin],

  data() {
    return {
      path: "/mock.json",
      track: {
        // TODO Времменно заглушка
        id: 11,
        title: "track name",
        artist: "artist name",
        artistId: "5",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
      },

      isLoading: true,
    };
  },

  created() {
    this.query.trackId = this.trackId;
    this.getList();
  },
};
</script>
