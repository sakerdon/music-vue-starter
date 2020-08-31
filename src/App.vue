<template>
  <div id="app" class="site-wrapper">
    <header class="header">
      <div class="container">
        <button
          class="header__menu-toggler hamburger hamburger--spring"
          type="button"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>

        <div class="header__menu-shadow"></div>
        header
      </div>
    </header>

    <div class="site-content">
      <div class="container site-row">
        <sidebar />

        <main class="main">
          <router-view />
        </main>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <audio-player />
      </div>
    </footer>
  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    AudioPlayer,
    Sidebar,
  },
};
</script>
