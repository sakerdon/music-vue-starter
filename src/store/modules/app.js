const state = {
  player: false,
  playing: false,
  list: [],
  currentIndex: -1,
  currentSong: {},
  likeList: [],
  playList: [],
};

const mutations = {
  TOGGLE_PLAYER: (state) => {
    state.player = !state.player;
  },

  SET_PLAY: (state, isPlaying) => {
    state.playing = isPlaying;
  },

  SET_LIST: (state, list) => {
    state.list = list;
  },

  SET_INDEX: (state, currentIndex) => {
    state.currentIndex = currentIndex;
  },

  SET_SONG: (state, currentSong) => {
    state.currentSong = currentSong;
  },

  SET_LIKE_LIST: (state, list) => {
    state.likeList = list;
  },

  SET_PLAY_LIST: (state, list) => {
    state.playList = list;
  },
};

const actions = {
  togglePlayer({ commit }) {
    commit('TOGGLE_PLAYER');
  },

  setPlay({ commit }, data) {
    commit('SET_PLAY', data);
  },

  setList({ commit }, data) {
    commit('SET_LIST', data);
  },

  setIndex({ commit }, index) {
    commit('SET_INDEX', index);
  },

  setSong({ commit }, song) {
    commit('SET_SONG', song);
  },

  setLikeList({ commit }, list) {
    commit('SET_LIKE_LIST', list);
  },

  setPlayList({ commit }, list) {
    commit('SET_PLAY_LIST', list);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
