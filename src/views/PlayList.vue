<template>
    
    <div class="category">
        <h1>My PlayList</h1>
        <song-list :dataList="dataList" :isLoading="false" />
    </div>
</template>
<script>
import SongList from '@/components/SongList'
// import {mapGetters} from 'vuex'

export default {

    name: 'PlayList',

    components: {
        SongList
    },

    data() {
        return {
            dataList: [],
        }
    },

    created() {
        this.getList();
    },

    // computed: {
    //     ...mapGetters(['playing', 'list', 'currentIndex', 'currentSong']),
    // },


    methods: {

        getList() {
            this.dataList =  JSON.parse(localStorage.getItem('playList')) || []  
        },

       
    },

}
</script>
