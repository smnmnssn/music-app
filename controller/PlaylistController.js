import { Playlist, PlaylistManager } from "../model/PlaylistModel.js";
import Song from "../model/SongModel.js";
import PlaylistView from "../view/PlaylistView.js";

const manager = new PlaylistManager();
const view = new PlaylistView();

// DOM elements
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

// Funktion: uppdaterar <select> med alla spellistor
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

// Ladda spellistor från localStorage
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

// Lyssnar på klick på "Skapa spellista"
createBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const genre = genreInput.value;

  if (name && genre) {
    const newPlaylist = new Playlist(name, genre);
    manager.createPlaylist(newPlaylist); // lägg till i modellen
    view.renderAllPlaylists(manager.getPlaylists()); // uppdatera visningen
    updatePlaylistDropdown(); // uppdatera dropdown

    // Spara till localStorage
    const storedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];
    const playlistToSave = { name, genre };
    storedPlaylists.push(playlistToSave);
    localStorage.setItem("playlists", JSON.stringify(storedPlaylists));

    // Töm fält
    nameInput.value = "";
    genreInput.value = "";
  }
});

songForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const artist = artistInput.value.trim();
  const title = titleInput.value.trim();
  const genre = genreSelect.value;
  const playlistName = playlistSelect.value;

  if (artist && title && genre && playlistName) {
    const newSong = new Song(artist, title, genre);

    // 1. Hitta rätt spellista
    const targetPlaylist = manager
      .getPlaylists()
      .find((p) => p.name === playlistName);
    if (!targetPlaylist) return;

    // 2. Lägg till låten
    targetPlaylist.addSong(newSong);

    // 3. Uppdatera localStorage
    const playlistsToSave = manager.getPlaylists().map((p) => ({
      name: p.name,
      genre: p.genre,
      songs: p.songs,
    }));
    localStorage.setItem("playlists", JSON.stringify(playlistsToSave));

    // 4. Uppdatera vy
    view.renderAllPlaylists(manager.getPlaylists());

    // 5. Töm fälten
    artistInput.value = "";
    titleInput.value = "";
  }
});
