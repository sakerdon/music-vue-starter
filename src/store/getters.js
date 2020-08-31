const getters = {
    player: state => state.app.player,
    playing: state => state.app.playing,
    list: state => state.app.list,
    currentIndex: state => state.app.currentIndex,
    currentSong: state => state.app.currentSong
  };
  export default getters;
  