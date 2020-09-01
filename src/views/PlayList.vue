<template>
  <div class="category">
    <h1>Мой плейлист</h1>
    <song-list :dataList="playList" :isLoading="false" hideShowMore>
      <template #empty>
        <center style="color:silver">
          <PlayListIcon class="icon" />
          Тут пока еще ничего нет. <br />
          Добавляйте треки в список, нажав на "+".
        </center>
      </template>
    </song-list>
  </div>
</template>
<script>
import SongList from '@/components/SongList';
import { mapGetters } from 'vuex';

import PlayListIcon from '@/assets/icons/playlist.svg';

export default {
  name: 'PlayList',

  computed: {
    ...mapGetters(['playList']),
  },

  components: {
    SongList,
    PlayListIcon,
  },
};
</script>

<style lang="scss" scoped>
.icon {
  margin-top: 5rem;
  width: 100px;
  display: block;
  opacity: 0.7;
  path {
    fill: silver;
  }
}
</style>
