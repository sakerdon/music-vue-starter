<template>
  <div class="list-wrapper">
    <!-- <pre>currentSong {{currentSong}}</pre> -->
    <!-- <pre>currentSong {{localStoragePlayList}}</pre> -->

    <!-- <pre>list {{list}}</pre> -->
    <!-- <pre>playing {{playing}}</pre> -->

    <preloader class="preloader" v-if="isLoading" />

    <template v-else>
      <div class="list" v-if="dataList.length">
        <div v-for="(item, index) in dataList" :key="index" class="list__item">
          <button
            class="list__play list__btn is-active"
            :title="playing ? 'Пауза' : 'Играть'"
            @click="onItemClick(item, index, dataList)"
          >
            <Pause v-if="currentSong.id === item.id && playing" />
            <Play v-else />
          </button>

          <div class="list__text">
            <router-link
              :to="{ name: 'track', params: { trackId: item.id } }"
              class="list__title"
              >{{ item.title }}
            </router-link>

            <router-link
              :to="{ name: 'artist', params: { artistId: item.artistId } }"
              class="list__artist"
              >{{ item.artist }}
            </router-link>
          </div>

          <div class="list__buttons">
            <button
              class="list__like list__btn"
              @click="toggleLike(item.id)"
              :class="{ 'is-active': checkLikeList(item.id) }"
            >
              <Like v-if="!checkLikeList(item.id)" />
              <LikeActive v-else />
            </button>

            <button
              class="list__add list__btn"
              @click="togglePlaylist(item)"
              :title="
                checkPlayList(item.id)
                  ? 'Убрать из моего плейлиста'
                  : 'Добавить в мой плейлист'
              "
              :class="{
                'is-active': checkPlayList(item.id),
              }"
            >
              <Add />
            </button>

            <button
              class="list__download list__btn"
              @click.prevent="download(item)"
            >
              <Download />
            </button>

            <button class="list__ringtone list__btn" title="На гудок">
              <Ringtone />
            </button>
          </div>
        </div>
        <button v-if="!hideShowMore" class="showmore">Загрузить еще</button>
      </div>
      <div v-else class="empty-plh">
        <slot name="empty">Тут пока еще ничего нет</slot>
      </div>
    </template>
  </div>
</template>
<script>
import Preloader from '@/components/Preloader';
import { mapGetters } from 'vuex';
import likeAndPlaylistMixin from '@/mixins/likeAndPlaylistMixin';

import Play from '@/assets/icons/play.svg';
import Pause from '@/assets/icons/pause.svg';
import Download from '@/assets/icons/download.svg';
import Ringtone from '@/assets/icons/rington.svg';
import Add from '@/assets/icons/add.svg';
import Like from '@/assets/icons/like.svg';
import LikeActive from '@/assets/icons/like-active.svg';

export default {
  name: 'SongList',

  components: {
    Preloader,

    Play,
    Pause,
    Download,
    Ringtone,
    Add,
    Like,
    LikeActive,
  },

  mixins: [likeAndPlaylistMixin],

  props: {
    hideShowMore: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      isLoading: Boolean,
      default: true,
    },
  },

  computed: {
    ...mapGetters(['playing', 'list', 'currentIndex', 'currentSong']),
  },

  methods: {
    download(item) {
      console.log(item.src);
    },

    onItemClick(item, index, list) {
      this.$store.dispatch('app/setList', list);
      this.$store.dispatch('app/setSong', item);

      this.$nextTick(() => {
        this.$store.dispatch('app/setIndex', index);
        this.$store.dispatch('app/setPlay', !this.playing);
      });
    },
  },
};
</script>
