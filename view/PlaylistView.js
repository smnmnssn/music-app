class PlaylistView {
  constructor() {
    this.playlistListElement = document.getElementById("playlist-list");
  }

  renderPlaylist(playlist) {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-item");

    // Rubrik för spellistan
    const playlistHeader = document.createElement("h3");
    playlistHeader.textContent = `🎵 ${playlist.name} - Genre: ${playlist.genre}`;
    playlistDiv.appendChild(playlistHeader);

    // Om det finns låtar i spellistan, visa dem
    if (playlist.songs.length > 0) {
      const songList = document.createElement("ul");

      playlist.songs.forEach((song) => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.artist} – ${song.title} (${song.genre})`;
        songList.appendChild(songItem);
      });

      playlistDiv.appendChild(songList);
    }

    // Lägg till spellistan i vyn
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
