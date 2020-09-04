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
    <song-list :dataList="dataList" :isLoading="isLoading" />
  </div>
</template>
<script>
import SongList from '@/components/SongList';
import { fetchList } from '@/api';

export default {
  name: 'Artist',

  components: {
    SongList,
  },

  props: {
    trackId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      page: 1,
      dataList: [],
      track: {
        id: 11,
        title: 'track name',
        artist: 'artist name',
        artistId: '5',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },

      isLoading: true,
    };
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      this.isLoading = true;

      /* let res = await fetchList({
                path: '/mock.json',
                query: {
                    page: this.page
                }
            }) */
      // this.dataList = res.data;
      // this.isLoading = false;

      await setTimeout(() => {
        // test

        fetchList({
          path: '/mock2.json',
          query: {
            page: this.page,
            artist_id: this.artistId,
          },
        }).then((res) => {
          this.dataList = res.data;
          this.isLoading = false;
        });
      }, 300);
    },
  },

  watch: {
    artistId: {
      //   immediate: true,
      handler() {
        this.page = 1;
        this.getList();
      },
    },
  },
};
</script>
