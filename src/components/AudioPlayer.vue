<template>
  <div class="player" :class="{ 'is-disabled': !currentSong.id }">
    <div @click="seek" class="player__progress">
      <div :style="{ width: this.percentComplete + '%' }" class="player__seeker"></div>

      <div class="player__time">
        <div class="player__time-current">{{ this.currentSeconds | convertTimeHHMMSS }}</div>
        <div class="player__time-total">{{ this.durationSeconds | convertTimeHHMMSS }}</div>
      </div>
    </div>

    <div class="player__controls">
      <!-- <a @click.prevent="stop" title="Stop" href="#">stop</a>-->

      <button
        class="player__prev player__btn"
        :class="{ 'is-disabled': currentIndex === 0 }"
        @click.prevent="prev"
      >
        <Next />
      </button>

      <button
        class="player__play player__btn"
        :class="{ 'is-active': playing }"
        :title="playing ? 'Пауза' : 'Играть'"
        @click.prevent="togglePlay"
      >
        <Pause v-if="playing" />
        <Play v-else />
      </button>

      <button class="player__next player__btn" @click.prevent="next" href="#">
        <Next class="_prev" />
      </button>

      <button
        class="player__loop player__btn"
        :class="{ 'is-active': innerLoop }"
        @click.prevent="innerLoop = !innerLoop"
        title="Loop"
      >
        <Loop />
      </button>

      <div class="player__text">
        <div class="player__title">{{ currentItem.title }}</div>
        <div class="player__artist">{{ currentItem.artist }}</div>
      </div>

      <button
        class="player__volume player__btn"
        @click.prevent
        @mouseenter="showVolume = true"
        @mouseleave="showVolume = false"
        title="Volume"
      >
        <Volume />
        <div
          v-show="showVolume"
          class="player__volume-input"
          @mouseenter="showVolume = true"
          @mouseleave="showVolume = false"
        >
          <input v-model.lazy.number="volume" type="range" min="0" max="100" />
        </div>
      </button>

      <button
        class="player__add player__btn"
        @click="togglePlaylist(currentSong)"
        :title="
          checkPlayList(currentSong.id)
            ? 'Убрать из моего плейлиста'
            : 'Добавить в мой плейлист'
        "
        :class="{
          'is-active': checkPlayList(currentSong.id),
        }"
      >
        <Add />
      </button>

      <button
        class="player__like player__btn"
        title="Like"
        @click="toggleLike(currentSong.id)"
        :class="{ 'is-active': checkLikeList(currentSong.id) }"
      >
        <LikeActive v-if="checkLikeList(currentSong.id)" />
        <Like v-else />
      </button>

      <button class="player__download player__btn" @click.prevent="download" title="Скачать">
        <Download />
      </button>

      <button class="player__ringtone player__btn" title="На гудок">
        <Ringtone />
      </button>
      <!-- <a class="" @click.prevent="mute" href="#" title="Mute">mute</a> -->
    </div>

    <audio :loop="innerLoop" ref="audiofile" :src="file" preload="auto" style="display: none;" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// icons
import Play from "@/assets/icons/play.svg";
import Pause from "@/assets/icons/pause.svg";
import Next from "@/assets/icons/next.svg";
import Loop from "@/assets/icons/loop.svg";
import Volume from "@/assets/icons/volume.svg";
import Download from "@/assets/icons/download.svg";
import Ringtone from "@/assets/icons/rington.svg";
import Add from "@/assets/icons/add.svg";
import Like from "@/assets/icons/like.svg";
import LikeActive from "@/assets/icons/like-active.svg";

import likeAndPlaylistMixin from "@/mixins/likeAndPlaylistMixin";

export default {
  name: "AudioPlayer",

  mixins: [likeAndPlaylistMixin],

  components: {
    Play,
    Pause,
    Next,
    Loop,
    Volume,
    Ringtone,
    Add,
    Download,
    Like,
    LikeActive,
  },

  filters: {
    convertTimeHHMMSS(val) {
      let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

      return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
    },
  },

  data: () => ({
    audio: undefined,
    currentSeconds: 0,
    durationSeconds: 0,
    innerLoop: false,
    loaded: false,
    // playing: false,
    previousVolume: 35,
    showVolume: false,
    volume: 100,
    autoPlay: false,
  }),
  computed: {
    ...mapGetters(["playing", "currentIndex", "currentSong", "list"]),
    muted() {
      return this.volume / 100 === 0;
    },
    percentComplete() {
      return parseInt((this.currentSeconds / this.durationSeconds) * 100);
    },
    currentItem() {
      return this.list[this.currentIndex] || {};
    },
  },

  created() {
    this.file = this.list[this.currentIndex]
      ? this.list[this.currentIndex].src
      : "";
  },
  mounted() {
    this.audio = this.$el.querySelectorAll("audio")[0];
    // this.audio = new Audio(this.file);
    this.audio.addEventListener("timeupdate", this.update);
    this.audio.addEventListener("loadeddata", this.load);
    this.audio.addEventListener("pause", () => {
      this.$store.dispatch("app/setPlay", false);
    });
    this.audio.addEventListener("play", () => {
      this.$store.dispatch("app/setPlay", true);
    });
    this.audio.addEventListener("ended", this.next);
  },

  methods: {
    togglePlay() {
      this.$store.dispatch("app/setPlay", !this.playing);
    },

    next() {
      let index = this.currentIndex + 1;
      if (index >= this.list.length) index = 0;
      if (index < 0) index = 0;
      this.$store.dispatch("app/setIndex", index);
      this.$store.dispatch("app/setSong", this.list[index]);
    },

    prev() {
      let index = this.currentIndex - 1;
      if (index >= this.list.length) index = 0;
      if (index < 0) index = 0;
      this.$store.dispatch("app/setIndex", index);
      this.$store.dispatch("app/setSong", this.list[index]);
    },
    download() {
      this.stop();
      window.open(this.file, "download");
    },
    load() {
      if (this.audio.readyState >= 2) {
        this.loaded = true;
        this.durationSeconds = parseInt(this.audio.duration);

        if (this.autoPlay) this.audio.play();
        return;
      }

      throw new Error("Failed to load sound file.");
    },
    mute() {
      if (this.muted) {
        return (this.volume = this.previousVolume);
      }

      this.previousVolume = this.volume;
      this.volume = 0;
    },
    seek(e) {
      if (!this.loaded) return;

      const el = e.target.getBoundingClientRect();
      const seekPos = (e.clientX - el.left) / el.width;

      this.audio.currentTime = parseInt(this.audio.duration * seekPos);
    },
    stop() {
      // this.playing = false;
      this.$store.dispatch("app/setPlay", false);
      this.audio.currentTime = 0;
    },
    update() {
      this.currentSeconds = parseInt(this.audio.currentTime);
    },
  },

  watch: {
    "currentSong.id"() {
      this.file = this.currentSong.src;
      this.audio.src = this.file;
      this.autoPlay = true;
      this.audio.load();
    },
    playing(value) {
      if (value) {
        return this.audio.play();
      }
      this.audio.pause();
    },
    volume() {
      this.audio.volume = this.volume / 100;
    },
  },
};
</script>
