<template>
    
    <div class="">

        <pre>list {{list}}</pre>
        <pre>playing {{playing}}</pre>
    
        <div class="list">
            <div
            v-for="(item, index) in dataList"
            :key="index" 
            class="list__item"
            @click="onItemClick(item, index, dataList)"
            >

            <span> {{ list.find( el=> el.id === item.id ) && index === currentIndex && playing ? 'pause' : 'play'  }}</span>
            ---
            {{index}} : {{item}}
            
            </div>
        </div>
    
        <div class="list">
            <div
            v-for="(item, index) in dataList2"
            :key="item.id" 
            class="list__item"
            @click="onItemClick(item, index, dataList2)"
            >

            <span> {{ list.find( el=> el.id === item.id ) && index === currentIndex && playing ? 'pause' : 'play'  }}</span>
            ---
            {{index}} : {{item}}
            
            </div>
        </div>

    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {

    name: 'AudioProvider',


    data() {
        return {

            dataList: [
                {
                id: '1',
                title: 'test',
                artist: 'Art q',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
              },

              {
                id: '2',
                title: 'test',
                artist: 'Silent Siren',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
              },

            ],

            dataList2: [
                {
                id: 3,
                title: 'test1',
                artist: 'lorem  ',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
              },

              {
                id: 6,
                title: 'test',
                artist: 'Silent Siren ds,ajfsdalfj aldsfja',
                src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
              },

            ],

        }
    },

    computed: {
        ...mapGetters(['playing', 'list', 'currentIndex']),
    },


    methods: {
        onItemClick(item, index, list) {
            this.$store.dispatch( 'app/setList', list)
            this.$store.dispatch('app/setIndex', -1)

            this.$nextTick( () => {
                this.$store.dispatch('app/setIndex', index)
                this.$store.dispatch( 'app/setPlay', !this.playing )

            }  )


        },
    },

}
</script>
<style lang="css" scoped>
.list {
    border: 1px solid red;
    margin: 30px;
}
</style>