<template>
    
    <div class="list-wrapper">

        <!-- <pre>currentSong {{currentSong}}</pre> -->
        <!-- <pre>currentSong {{localStoragePlayList}}</pre> -->

        <!-- <pre>list {{list}}</pre> -->
        <!-- <pre>playing {{playing}}</pre> -->

        <preloader class="preloader" v-if="isLoading" />

        <template v-else>
        <div  class="list" v-if="dataList.length">
            <div
            v-for="(item, index) in dataList"
            :key="index" 
            class="list__item"
            >
            
            <button 
                class="list__play"
                :class="currentSong.id === item.id && playing ? 'is-pause' : 'is-play'"
                type="button" 
                @click="onItemClick(item, index, dataList)"
            > 
                {{ currentSong.id === item.id && playing ? 'pause' : 'play'  }}
            </button>

            <div class="list__text">
                <div class="list__title">
                    {{item.title}}
                </div>
                <div class="list__artist">
                    {{item.artist}}
                </div>
            </div>

            <div class="list__buttons">
                <button class="list__download" @click.prevent="download(item)">download</button>
                
                <button class="list__like" 
                    @click="toggleLike(item.id)"
                    :class="{'is-active': localStorageLikeList.includes(item.id)}"
                >like</button>

                <button class="list__like" 
                    @click="togglePlaylist(item)"
                    :class="{'is-active': localStoragePlayList.find( el => el.id === item.id)}"
                > {{localStoragePlayList.find( el => el.id === item.id) ? 'remove' : 'add'}}</button>
            </div>

            
            </div>
        </div>
        <div v-else class="empty-plh">
            <slot name="empty">
                Тут пока еще ничего нет
            </slot>
            </div>
        </template>


    </div>
</template>
<script>
import Preloader from '@/components/Preloader'
import {mapGetters} from 'vuex'

export default {

    name: 'SongList',

    components: {
        Preloader
    },

    props: {
        dataList: {
            type: Array,
            default: () => []
        },
        isLoading: {
            isLoading: Boolean,
            default: true
        }
    },

    
    data:  () => ({
        localStorageLikeList: JSON.parse(localStorage.getItem('likeList')) || [],
        localStoragePlayList: JSON.parse(localStorage.getItem('playList')) || []
    }),


    computed: {
        ...mapGetters(['playing', 'list', 'currentIndex', 'currentSong']),
        
    },


    methods: {

        toggleLike(id) {
            let list = JSON.parse(localStorage.getItem('likeList')) || [];

            if (list.includes(id)) {
                list = list.filter( el => el !== id );
            } else {
                list.push(id);
            }

            localStorage.setItem('likeList', JSON.stringify(list))
            this.localStorageLikeList = list;

        },

        togglePlaylist(item) {
            let list = JSON.parse(localStorage.getItem('playList')) || [];

            if (list.find( el => el.id ===  item.id)) {
                list = list.filter( el => el.id !== item.id );
            } else {
                list.push(item);
            }

            localStorage.setItem('playList', JSON.stringify(list))
            this.localStoragePlayList = list;

        },


        download(item) {
            console.log(item.src);
        },
        
        onItemClick(item, index, list) {
            this.$store.dispatch( 'app/setList', list)
            this.$store.dispatch( 'app/setSong', item)
            

            this.$nextTick( () => {
                this.$store.dispatch('app/setIndex', index)
                this.$store.dispatch( 'app/setPlay', !this.playing )

            }  )


        },
    },

}
</script>