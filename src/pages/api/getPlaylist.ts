import { allPlaylists, songs } from "@data";
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, request }) => {
  const { url } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");

  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const playlistSongs = songs.filter(
    (song) => song.albumId === playlist?.albumId
  );

  return new Response(JSON.stringify({ playlist, songs: playlistSongs }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
