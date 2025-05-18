export class Playlist {
  constructor(name, genre) {
    this.name = name;
    this.genre = genre;
    this.songs = [];
  }

  // Lägger till en låt i spellistan
  addSong(song) {
    this.songs.push(song);
  }

  // Tar bort låt från spellistan baserat på titel
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

  // Lägger till ny spellista
  createPlaylist(playlist) {
    this.playlists.push(playlist);
  }

  // Tar bort en spellista baserat på namn
  deletePlaylist(name) {
    const index = this.playlists.findIndex((p) => p.name === name);
    if (index !== -1) {
      this.playlists.splice(index, 1);
    }
  }

  // Returnerar alla spellistor
  getPlaylists() {
    return this.playlists;
  }
}
