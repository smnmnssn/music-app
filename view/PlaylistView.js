class PlaylistView {
  constructor() {
    this.playlistListElement = document.getElementById("playlist-list");
  }

  // Renderar en enskild spellista med tillhörande låtar
  renderPlaylist(playlist) {
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("playlist-item");

    const playlistHeader = document.createElement("h3");
    playlistHeader.textContent = `🎵 ${playlist.name} - ${playlist.genre}`;

    const deletePlaylistBtn = document.createElement("button");
    deletePlaylistBtn.textContent = "❌";
    deletePlaylistBtn.classList.add("delete-playlist-btn");
    deletePlaylistBtn.dataset.name = playlist.name;

    playlistHeader.appendChild(deletePlaylistBtn);
    playlistDiv.appendChild(playlistHeader);

    if (playlist.songs.length > 0) {
      const songList = document.createElement("ul");

      playlist.songs.forEach((song) => {
        const songItem = document.createElement("li");
        songItem.textContent = `${song.artist} – ${song.title} (${song.genre})`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("delete-song-btn");
        deleteBtn.dataset.title = song.title;
        deleteBtn.dataset.playlist = playlist.name;

        songItem.appendChild(deleteBtn);
        songList.appendChild(songItem);
      });

      playlistDiv.appendChild(songList);
    }

    this.playlistListElement.appendChild(playlistDiv);
  }

  // Renderar alla spellistor i listan
  renderAllPlaylists(playlists) {
    this.playlistListElement.innerHTML = "";

    playlists.forEach((playlist) => {
      this.renderPlaylist(playlist);
    });
  }
}

export default PlaylistView;
