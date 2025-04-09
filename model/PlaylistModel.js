import Song from './Song.js'; // eller rätt sökväg beroende på din struktur


class Playlist {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }

  removeSong(title) {
    const index = this.songs.findIndex((s) => s.title === title);
  
    if (index !== -1) {
      this.songs.splice(index, 1);
    }
  }
  
} 

class PlaylistManager {
  constructor() {
    this.playlists = [];
  }

  createPlaylist(playlist) {
    this.playlists.push(playlist);
  }

  deletePlaylist(name) {
    const index = this.playlists.findIndex((p) => p.name === name);

    if (index !== -1) {
      this.playlists.splice(index, 1);
    } 
  }

  getPlaylists() {
    return this.playlists;

  }
}

// === Skapar ett exempel för att testa ===
const playlist = new Playlist("Min Spellista", "Rock");
const song = new Song("Queen", "Bohemian Rhapsody", "Rock");

playlist.addSong(song); // Lägger till låten i spellistan

const manager = new PlaylistManager();
manager.createPlaylist(playlist); // Lägger till spellistan i hanteraren

console.log(manager.getPlaylists()); // Skriver ut spellistorna i konsolen