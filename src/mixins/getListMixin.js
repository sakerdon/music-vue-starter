import { fetchList } from '@/api';

export default {
  data() {
    return {
      page: 1,
      dataList: [],
      isLoading: true,

      path: '/mock2.json', // Must be overwritten in component
      query: {
        page: 1,
        limit: 20,
      },
    };
  },

  methods: {
    showMore() {
      this.query.page++;
      this.getList();
    },

    async getList() {
      this.isLoading = true;

      // TODO Убрать таймаут когда будут готовы эндпойнты
      setTimeout(() => {
        fetchList({
          path: this.path,
          query: this.query,
        }).then((res) => {
          this.dataList = [...this.dataList, ...res.data];
          this.isLoading = false;
        });
      }, 300);
    },
  },
};
