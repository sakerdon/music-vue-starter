<template>
    
    <div class="">
        <h1>HOME</h1>
        <song-list :dataList="dataList" :isLoading="isLoading" />

    </div>
</template>
<script>
import SongList from '@/components/SongList'
import {mapGetters} from 'vuex'
import { fetchList } from '@/api'

export default {

    name: 'AudioProvider',

    components: {
        SongList
    },


    data() {
        return {
            page: 1,
            dataList: [],
            isLoading: true
        }
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

            await setTimeout(() => { // test

                fetchList({ 
                    path: '/mock.json', 
                query: {
                    page: this.page
                } 
            }).then( res => {
                this.dataList = res.data
                this.isLoading = false;
                }  )
            }, 300);

        },

       
    },

}
</script>
