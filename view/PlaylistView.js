class PlaylistView {
  constructor() {
    this.playlistListElement = document.getElementById("playlist-list");
  }

  renderPlaylist(playlist) {
    const playlistDiv = document.createElement("div");
    playlistDiv.textContent = `🎵 ${playlist.name} - Genre: ${playlist.genre}`;
    playlistDiv.classList.add("playlist-item");
    this.playlistListElement.appendChild(playlistDiv);
  }

  renderAllPlaylists(playlists) {
    this.playlistListElement.innerHTML = "";

    playlists.forEach((playlist) => {
      this.renderPlaylist(playlist);
    });
  }
}

export default PlaylistView;
