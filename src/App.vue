<template>
  <div id="app" class="site-wrapper">
    <header class="header">
      <div class="container">
        <button class="header__menu-toggler hamburger hamburger--spring" type="button">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>

        <router-link class="header__logo" to="/">
          <img src="/svg/music.svg" alt="logo" />myMuzz
        </router-link>

        <div class="header__menu-shadow"></div>
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
        <div
          class="footer__text"
        >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo possimus distinctio non maiores voluptate, officiis omnis ipsum vero, sit nesciunt sint. Perspiciatis ut, quod vero earum dolore tenetur hic doloremque?</div>
        <audio-player />
      </div>
    </footer>
  </div>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: {
    AudioPlayer,
    Sidebar,
  },
};
</script>
