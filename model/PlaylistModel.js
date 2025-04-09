import Song from './SongModel.js';


export class Playlist {
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

export class PlaylistManager {
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

// Test
const playlist = new Playlist("Min Spellista", "Rock");
const song = new Song("Queen", "Bohemian Rhapsody", "Rock");

playlist.addSong(song);

const manager = new PlaylistManager();
manager.createPlaylist(playlist); 

console.log(manager.getPlaylists()); 
