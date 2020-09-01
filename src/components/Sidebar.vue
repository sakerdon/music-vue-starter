<template>
  <div class="sidebar">
    <ul class="sidebar__list">
      <li class="sidebar__item">
        <router-link :to="{ name: 'playlist' }">
          <div class="sidebar__icon">
            <img src="/svg/smartphone.svg" alt="icon" />
          </div>
          Мой плейлист
          <span v-html="'&nbsp;'"></span>
          <span style="font-weight: normal; opacity: 0.3; flex-shrink:0">
            &nbsp;({{ $store.state.app.playList.length }})</span
          >
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link to="/">
          <div class="sidebar__icon">
            <img src="/svg/music-2.svg" alt="icon" />
          </div>
          Топ музыки
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'category', params: { categoryId: 1 } }">
          <div class="sidebar__icon">
            <img src="/svg/electric-guitar.svg" alt="icon" />
          </div>
          Рок
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'category', params: { categoryId: 2 } }">
          <div class="sidebar__icon">
            <img src="/svg/forest.svg" alt="icon" />
          </div>
          На природе
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'category', params: { categoryId: 3 } }">
          <div class="sidebar__icon">
            <img src="/svg/balloons.svg" alt="icon" />
          </div>
          Романтика
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'category', params: { categoryId: 4 } }">
          <div class="sidebar__icon">
            <img src="/svg/dumbbell.svg" alt="icon" />
          </div>
          Для спорта
        </router-link>
      </li>

      <li class="sidebar__item">
        <router-link :to="{ name: 'category', params: { categoryId: 5 } }">
          <div class="sidebar__icon">
            <img src="/svg/music-1.svg" alt="icon" />
          </div>
          Клубная
        </router-link>
      </li>
    </ul>
  </div>
</template>
