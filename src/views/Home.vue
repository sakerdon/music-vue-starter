<template>
  <div class="home-page">
    <h1>Музыкальные подборки</h1>
    <top-categories />
    <h1>Топ музыки</h1>
    <song-list :dataList="dataList" :isLoading="isLoading" />
    <h1>Топ исполнителей</h1>
    <top-artists />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { fetchList } from '@/api';

import SongList from '@/components/SongList';
import TopArtists from '@/components/TopArtists';
import TopCategories from '@/components/TopCategories';

export default {
  name: 'AudioProvider',

  components: {
    SongList,
    TopArtists,
    TopCategories,
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

  computed: {
    ...mapGetters(['playing', 'list', 'currentIndex', 'currentSong']),
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
          path: '/mock.json',
          query: {
            page: this.page,
          },
        }).then((res) => {
          this.dataList = res.data;
          this.isLoading = false;
        });
      }, 300);
    },
  },
};
</script>
