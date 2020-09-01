import { mapGetters } from 'vuex';

export default {
  // data: () => ({
  //   localStorageLikeList: JSON.parse(localStorage.getItem('likeList')) || [],
  //   localStoragePlayList: JSON.parse(localStorage.getItem('playList')) || [],
  // }),

  created() {
    this.$store.dispatch(
      'app/setLikeList',
      JSON.parse(localStorage.getItem('likeList')) || []
    );
    this.$store.dispatch(
      'app/setPlayList',
      JSON.parse(localStorage.getItem('playList')) || []
    );
  },

  computed: {
    ...mapGetters(['likeList', 'playList']),
    checkLikeList() {
      return (id) => this.likeList.includes(id);
    },
    checkPlayList() {
      return (id) => this.playList.find((el) => el.id === id);
    },
  },

  methods: {
    toggleLike(id) {
      let list = JSON.parse(localStorage.getItem('likeList')) || [];

      if (list.includes(id)) {
        list = list.filter((el) => el !== id);
      } else {
        list.push(id);
      }

      localStorage.setItem('likeList', JSON.stringify(list));
      this.$store.dispatch('app/setLikeList', list);
      // this.localStorageLikeList = list;
    },

    togglePlaylist(item) {
      let list = JSON.parse(localStorage.getItem('playList')) || [];

      if (list.find((el) => el.id === item.id)) {
        list = list.filter((el) => el.id !== item.id);
      } else {
        list.push(item);
      }

      localStorage.setItem('playList', JSON.stringify(list));
      this.$store.dispatch('app/setPlayList', list);

      // this.localStoragePlayList = list;
    },
  },
};
