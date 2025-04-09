import { Playlist, PlaylistManager } from "../model/PlaylistModel.js";
import PlaylistView from "../view/PlaylistView.js";

const manager = new PlaylistManager();
const view = new PlaylistView();

const nameInput = document.getElementById("playlist-name");
const genreInput = document.getElementById("playlist-genre");
const createBtn = document.getElementById("create-playlist-btn")

createBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const genre = genreInput.value.trim();

  if (name && genre) {
    const newPlaylist = new Playlist(name, genre);
    manager.createPlaylist(newPlaylist);
    view.renderAllPlaylists(manager.getPlaylists());

    nameInput.value = "";
    genreInput.value = "";
  }

});

