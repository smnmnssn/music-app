import { Playlist, PlaylistManager } from "../model/PlaylistModel.js";
import Song from "../model/SongModel.js";
import PlaylistView from "../view/PlaylistView.js";

const manager = new PlaylistManager();
const view = new PlaylistView();

const nameInput = document.getElementById("playlist-name");
const genreInput = document.getElementById("playlist-genre-select");
const createBtn = document.getElementById("create-playlist-btn");
const playlistSelect = document.getElementById("playlist-select");
const artistInput = document.getElementById("artist-name");
const titleInput = document.getElementById("song-name");
const songGenreInput = document.getElementById("song-genre");
const songForm = document.getElementById("add-song-form");
const genreSelect = document.getElementById("genre-select");
const filterGenreSelect = document.getElementById("filter-genre");

// Uppdaterar spellistemenyn
function updatePlaylistDropdown() {
  playlistSelect.innerHTML = "";
  const playlists = manager.getPlaylists();
  playlists.forEach((playlist) => {
    const option = document.createElement("option");
    option.value = playlist.name;
    option.textContent = playlist.name;
    playlistSelect.appendChild(option);
  });
}

// Filtrerar spellistor på genre
filterGenreSelect.addEventListener("change", () => {
  const selectedGenre = filterGenreSelect.value;
  const allPlaylists = manager.getPlaylists();
  if (selectedGenre === "all") {
    view.renderAllPlaylists(allPlaylists);
  } else {
    const filtered = allPlaylists.filter((p) => p.genre === selectedGenre);
    view.renderAllPlaylists(filtered);
  }
});

// Laddar sparade spellistor från localStorage
const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
savedPlaylists.forEach((item) => {
  const playlist = new Playlist(item.name, item.genre);
  if (item.songs && Array.isArray(item.songs)) {
    item.songs.forEach((songData) => {
      const song = new Song(songData.artist, songData.title, songData.genre);
      playlist.addSong(song);
    });
  }
  manager.createPlaylist(playlist);
});

view.renderAllPlaylists(manager.getPlaylists());
updatePlaylistDropdown();

// Hanterar klick för att ta bort låtar eller spellistor
document.getElementById("playlist-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-song-btn")) {
    const title = e.target.dataset.title;
    const playlistName = e.target.dataset.playlist;
    const playlist = manager.getPlaylists().find(p => p.name === playlistName);
    if (!playlist) return;
    playlist.removeSong(title);
    const playlistsToSave = manager.getPlaylists().map(p => ({
      name: p.name,
      genre: p.genre,
      songs: p.songs
    }));
    localStorage.setItem("playlists", JSON.stringify(playlistsToSave));
    view.renderAllPlaylists(manager.getPlaylists());
  }

  if (e.target.classList.contains("delete-playlist-btn")) {
    const playlistName = e.target.dataset.name;
    manager.deletePlaylist(playlistName);
    const playlistsToSave = manager.getPlaylists().map(p => ({
      name: p.name,
      genre: p.genre,
      songs: p.songs
    }));
    localStorage.setItem("playlists", JSON.stringify(playlistsToSave));
    view.renderAllPlaylists(manager.getPlaylists());
    updatePlaylistDropdown();
  }
});

// Skapar ny spellista
createBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const genre = genreInput.value;
  if (name && genre) {
    const newPlaylist = new Playlist(name, genre);
    manager.createPlaylist(newPlaylist);
    view.renderAllPlaylists(manager.getPlaylists());
    updatePlaylistDropdown();
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    const playlistToSave = { name, genre };
    storedPlaylists.push(playlistToSave);
    localStorage.setItem("playlists", JSON.stringify(storedPlaylists));
    nameInput.value = "";
    genreInput.value = "";
  }
});

// Lägger till låt i spellista
songForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const artist = artistInput.value.trim();
  const title = titleInput.value.trim();
  const genre = genreSelect.value;
  const playlistName = playlistSelect.value;
  if (artist && title && genre && playlistName) {
    const newSong = new Song(artist, title, genre);
    const targetPlaylist = manager.getPlaylists().find((p) => p.name === playlistName);
    if (!targetPlaylist) return;
    targetPlaylist.addSong(newSong);
    const playlistsToSave = manager.getPlaylists().map((p) => ({
      name: p.name,
      genre: p.genre,
      songs: p.songs,
    }));
    localStorage.setItem("playlists", JSON.stringify(playlistsToSave));
    view.renderAllPlaylists(manager.getPlaylists());
    artistInput.value = "";
    titleInput.value = "";
  }
});
