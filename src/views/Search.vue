<template>
  <div class="category">
    <h1>Поиск {{ term ? 'по ' + '"' + term + '"' : '' }}</h1>
    <song-list :dataList="dataList" :isLoading="isLoading">
      <template #empty>
        Ничего не найдено :(
      </template>
    </song-list>
  </div>
</template>
<script>
import SongList from '@/components/SongList';
import { mapGetters } from 'vuex';
import { fetchList } from '@/api';

export default {
  name: 'Search',

  props: {
    // term: {
    //   type: String,
    //   default: '',
    // },
  },

  components: {
    SongList,
  },

  data() {
    return {
      page: 1,
      term: '',
      dataList: [],
      isLoading: true,
    };
  },

  created() {
    // this.getList();
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
            term: this.term,
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
    '$route.query.term': {
      immediate: true,
      handler(value) {
        this.page = 1;
        this.term = value;
        this.getList();
      },
    },
  },
};
</script>
