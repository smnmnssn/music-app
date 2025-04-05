class Playlist {
  constructor(name, genre, artist) {
    this.name = name;
    this.genre = genre;
    this.artist = artist;
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
  }
}