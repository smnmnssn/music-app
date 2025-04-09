import { Playlist } from "../model/PlaylistModel.js";
import PlaylistView from "../view/PlaylistView.js";

const playlist1 = new Playlist("Min Spellista", "Rock");
playlist1.addSong({ title: "Bohemian Rhapsody", artist: "Queen" });

const playlist2 = new Playlist("Chill Vibes", "Lo-fi");
playlist2.addSong({ title: "Coffee Break", artist: "Lo-Fi Beats" });

const playlists = [playlist1, playlist2];

const view = new PlaylistView();

view.renderAllPlaylists(playlists);
