import type { Playlist, Song } from "@data";
import { create } from "zustand";

interface Music {
  playlist: Playlist | null;
  song: Song | null;
  songs: Song[] | null;
}

interface PlayerStore {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentMusic: Music;
  setCurrentMusic: (music: Music) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => {
    set({ isPlaying });
  },
  currentMusic: { playlist: null, song: null, songs: null },
  setCurrentMusic: (music: Music) => {
    set({ currentMusic: music });
  },
  volume: 0.5,
  setVolume: (volume: number) => {
    set({ volume });
  },
}));

export default usePlayerStore;
