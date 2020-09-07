<template>
  <div id="app" class="site-wrapper">
    <header class="header">
      <div class="container">
        <button
          class="header__menu-toggler hamburger hamburger--spring"
          :class="{'is-active': isMenuActive}"
          type="button"
          @click="isMenuActive = !isMenuActive"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>

        <router-link class="header__logo" to="/">
          <img src="/svg/music.svg" alt="logo" />myMuzz
        </router-link>

        <search-form />

        <div class="header__menu-shadow"></div>
      </div>
    </header>

    <div class="site-content" @click="isMenuActive = false">
      <div class="container site-row">
        <sidebar :class="{'is-active': isMenuActive}" @choise="isMenuActive = false" />

        <main class="main">
          <router-view />
        </main>
      </div>
    </div>

    <footer class="footer">
      <div class="container">
        <div class="footer__text">
          <div class="footer__links">
            <a href="#">О проекте</a>
            <a href="#">Об услуге</a>
          </div>

          <div class="footer__copuright">&copy; myMuzz, {{new Date().getFullYear()}}</div>
          <div class="footer__license">
            Иконки с сайта
            <a
              href="https://www.flaticon.com/"
              target="_blank"
              title="Flaticon"
            >www.flaticon.com</a>
          </div>
        </div>

        <audio-player />
      </div>
    </footer>
  </div>
</template>

<script>
import AudioPlayer from "./components/AudioPlayer.vue";
import Sidebar from "./components/Sidebar.vue";
import SearchForm from "./components/SearchForm.vue";

export default {
  name: "App",
  components: {
    AudioPlayer,
    Sidebar,
    SearchForm,
  },
  data: () => ({
    isMenuActive: false,
  }),
};
</script>
