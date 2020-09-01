const getters = {
  player: (state) => state.app.player,
  playing: (state) => state.app.playing,
  list: (state) => state.app.list,
  currentIndex: (state) => state.app.currentIndex,
  currentSong: (state) => state.app.currentSong,
  playList: (state) => state.app.playList,
  likeList: (state) => state.app.likeList,
};
export default getters;
