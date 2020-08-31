<template>
    <div class="player">
        <!-- <pre>currentTime {{audio ? audio.currentTime : ''}}</pre> -->
        <!-- <pre>list {{list}}</pre> -->
        <!-- <pre>currentIndex {{currentIndex}}</pre> -->
        <!-- <pre>playing {{playing}}</pre> -->
        


        <div class="player__text">
            <div class="player__artist">
                artist {{currentItem.artist}}
            </div>
            
            <div class="player__title">
                title {{currentItem.title}}
            </div>
        </div>

        <div class="player__controls">
            
            <div>
                <a @click.prevent="stop" title="Stop" href="#">
                    stop
                </a>
            </div>

            <div>
                <a @click.prevent="togglePlay" :title="(playing) ? 'Pause' : 'Play'" href="#">
                    {{ playing ? 'pause' : 'play' }}
                </a>
            </div>

                <div @click="seek" class="player__progress" title="Seek">
                    <div :style="{ width: this.percentComplete + '%' }" class="player__seeker"></div>
                </div>
                <div class="player__time">
                    <div class="player__time-current">{{ this.currentSeconds | convertTimeHHMMSS }}</div>
                    <div class="player__time-total">{{ this.durationSeconds | convertTimeHHMMSS }}</div>
                </div>
            <div>
                <a @click.prevent="download" href="#" title="Download">
                    dwload
                </a>
            </div>
            <div>
                <a @click.prevent="innerLoop = !innerLoop" href="#" title="Loop">
                    loop
                </a>
            </div>
            <div>
                <a @click.prevent="mute" href="#" title="Mute">
                    mute
                </a>
            </div>
            <div>
                <a @click.prevent="" @mouseenter="showVolume = true" @mouseleave="showVolume = false" title="Volume" href="#">
                    vol
                    <input v-model.lazy.number="volume" v-show="showVolume" type="range" min="0" max="100" />
                </a>
            </div>
            <div>
                <a @click.prevent="next" href="#">
                    next</a>
            </div>
            <div>
                <a @click.prevent="prev" href="#">
                    prev</a>
            </div>
                    
        </div>
        <audio :loop="innerLoop" ref="audiofile" :src="file" preload="auto" style="display: none;"></audio>
    </div>
</template>
<script>

import {mapGetters} from 'vuex'
export default {

    name: 'AudioPlayer',

    props: {
        loop: {
            type: Boolean,
            default: false
        }
    },

    filters: {
        convertTimeHHMMSS(val) {
            let hhmmss = new Date(val * 1000).toISOString().substr(11, 8);

            return hhmmss.indexOf("00:") === 0 ? hhmmss.substr(3) : hhmmss;
        }
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
        autoPlay: false
    }),
    computed: {
        ...mapGetters(['playing', 'currentIndex', 'currentSong', 'list']),
        muted() {
            return this.volume / 100 === 0;
        },
        percentComplete() {
            return parseInt(this.currentSeconds / this.durationSeconds * 100);
        },
        currentItem() {
            return this.list[this.currentIndex] || {}; 
        }
    },

    created() {
        this.innerLoop = this.loop;
        this.file = this.list[this.currentIndex] ? this.list[this.currentIndex].src : '';
    },
    mounted() {
        this.audio = this.$el.querySelectorAll('audio')[0];
        // this.audio = new Audio(this.file);
        this.audio.addEventListener('timeupdate', this.update);
        this.audio.addEventListener('loadeddata', this.load);
        this.audio.addEventListener('pause', () => { this.$store.dispatch( 'app/setPlay', false )});
        this.audio.addEventListener('play', () => { this.$store.dispatch( 'app/setPlay', true )});
        this.audio.addEventListener('ended', this.next );
    },

    methods: {

        togglePlay() {
            this.$store.dispatch('app/setPlay', !this.playing);
        },

        next() {
            let index = this.currentIndex + 1;
            if (index >= this.list.length) index = 0
            if (index < 0) index = 0            
            this.$store.dispatch('app/setIndex', index);
            this.$store.dispatch('app/setSong', this.list[index]);
        },

            
        prev() {
            let index = this.currentIndex - 1;
            if (index >= this.list.length) index = 0
            if (index < 0) index = 0            
            this.$store.dispatch('app/setIndex', index);
            this.$store.dispatch('app/setSong', this.list[index]);
            
        },
        download() {
            this.stop();
            window.open(this.file, 'download');
        },
        load() {
            if (this.audio.readyState >= 2) {
                this.loaded = true;
                this.durationSeconds = parseInt(this.audio.duration);

                // console.log('load', this.autoPlay);

                // return this.playing = this.autoPlay;
                if (this.autoPlay)  this.audio.play() 
                return 
            }

            throw new Error('Failed to load sound file.');
        },
        mute() {
            if (this.muted) {
                return this.volume = this.previousVolume;
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
            this.$store.dispatch('app/setPlay', false)
            this.audio.currentTime = 0;
        },
        update() {
            this.currentSeconds = parseInt(this.audio.currentTime);
        }
    },


    watch: {

        'currentSong.id'() {
            this.file = this.currentSong.src;
            this.audio.src = this.file;
            this.autoPlay = true;
            this.audio.load(); 
        },
        playing(value) {
            if (value) { 
                // this.$store.dispatch('app/setPlay', true)
                return this.audio.play(); 
            }
                // this.$store.dispatch('app/setPlay', false)
            this.audio.pause();
        },
        volume() {
            this.audio.volume = this.volume / 100;
        }
    },

}
</script>
<style lang="scss">
$player-bg: #fff;
$player-border-color: darken($player-bg, 12%);
$player-link-color: darken($player-bg, 75%);
$player-progress-color: $player-border-color;
$player-seeker-color: $player-link-color;
$player-text-color: $player-link-color;


.player {
    background-color: $player-bg;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.15);
    color: $player-text-color;

    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 2rem;

    &__controls {
        display: flex;

        >div {
            border-right: 1px solid $player-border-color;

            &:last-child {
                border-right: none;
            }

            a {
                color: $player-link-color;
                display: block;
                line-height: 0;
                padding: 1em;
                text-decoration: none;
            }
        }
    }

    &__progress {
        background-color: $player-progress-color;
        cursor: pointer;
        height: 50%;
        min-width: 200px;
        position: absolute;
        width: 100%;
        height: 20px;
        top: -5px;
        z-index: 2;
        left: 0;
    }

    &__seeker {
        background-color: $player-seeker-color;
        bottom: 0;
        left: 0;
        position: absolute;
        top: 0;
    }

    &__time {
        display: flex;
        justify-content: space-between;
    }

    &__time-current {
            font-weight: 700;
            padding-left: 5px;
    }

    &__time-total {
        opacity: 0.5;
        padding-right: 5px;
    }

}
        


</style>