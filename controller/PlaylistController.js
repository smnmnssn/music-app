import { Playlist, PlaylistManager } from "../model/PlaylistModel.js";
import PlaylistView from "../view/PlaylistView.js";

const manager = new PlaylistManager();
const view = new PlaylistView();


// DOM elements
const nameInput = document.getElementById("playlist-name");
const genreInput = document.getElementById("playlist-genre");
const createBtn = document.getElementById("create-playlist-btn");
const playlistSelect = document.getElementById("playlist-select");

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

// Ladda spellistor från localStorage
const savedPlaylists = JSON.parse(localStorage.getItem("playlists")) || [];

savedPlaylists.forEach((item) => {
  const playlist = new Playlist(item.name, item.genre);
  manager.createPlaylist(playlist);
});

view.renderAllPlaylists(manager.getPlaylists());
updatePlaylistDropdown();

// Lyssnar på klick på "Skapa spellista"
createBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const genre = genreInput.value.trim();

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
