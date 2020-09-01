<template>
  <div class="category">
    <h1>Category {{ $route.params.categoryId }}</h1>
    <song-list :dataList="dataList" :isLoading="isLoading" />
  </div>
</template>
<script>
import SongList from '@/components/SongList';
import { mapGetters } from 'vuex';
import { fetchList } from '@/api';

export default {
  name: 'Category',

  components: {
    SongList,
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
          path: '/mock2.json',
          query: {
            page: this.page,
            category_id: this.$route.params.categoryId,
          },
        }).then((res) => {
          this.dataList = res.data;
          this.isLoading = false;
        });
      }, 300);
    },
  },

  watch: {
    '$route.params.categoryId': {
      //   immediate: true,
      handler() {
        this.page = 1;
        this.getList();
      },
    },
  },
};
</script>
