<template>
  <div class="artist">
    <div class="artist__header">
      <div class="artist__img">
        <img
          src="https://cdn-st1.rtr-vesti.ru/vh/pictures/xw/225/986/5.jpg"
          alt="img"
        />
      </div>
      <h1>Artist {{ artistId }}</h1>
    </div>
    <h2>Популярные треки</h2>
    <song-list :dataList="dataList" :isLoading="isLoading" />
  </div>
</template>
<script>
import SongList from '@/components/SongList';
// import { mapGetters } from 'vuex';
import { fetchList } from '@/api';

export default {
  name: 'Artist',

  components: {
    SongList,
  },

  props: {
    artistId: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      page: 1,
      dataList: [],
      isLoading: true,
    };
  },

  created() {
    this.getList();
  },

  //   computed: {
  //     ...mapGetters(['playing', 'list', 'currentIndex', 'currentSong']),
  //   },

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
