<template>
  <div class="sidebar">
    <ul class="sidebar__list" @click="$emit('choise')">
      <li class="sidebar__item">
        <router-link to="/">
          <div class="sidebar__icon">
            <img src="/svg/music-2.svg" alt="icon" />
          </div>Топ музыки
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'categoryList' }">
          <div class="sidebar__icon">
            <img src="/svg/music-1.svg" alt="icon" />
          </div>Подборки
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'artistList' }">
          <div class="sidebar__icon">
            <img src="/svg/microphone.svg" alt="icon" />
          </div>Исполнители
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'playlist' }">
          <div class="sidebar__icon">
            <img src="/svg/smartphone.svg" alt="icon" />
          </div>Мой плейлист
          <span v-html="'&nbsp;'"></span>
          <span
            style="font-weight: normal; opacity: 0.3; flex-shrink:0"
          >&nbsp;({{ $store.state.app.playList.length }})</span>
        </router-link>
      </li>
    </ul>

    <!-- <div class="sidebar__banner">
      <img src="/example.jpg" alt="" />
    </div>-->
  </div>
</template>
