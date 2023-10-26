import usePlayerStore from "src/store/playerStore";
import PlayButton from "./PlayButton";

interface Props {
  id: string;
}

function CardPlayButton({ id }: Props) {
  const { setIsPlaying, isPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);
  const isPlayingPlaylist = currentMusic.playlist?.id === id;

  const handleClick = () => {
    if (isPlaying && isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    if (isPlayingPlaylist) {
      setIsPlaying(true);
      return;
    }

    fetch(`/api/getPlaylist?id=${id}`)
      .then(async (resp) => await resp.json())
      .then(({ playlist, songs }) => {
        const currentSongIndex = Math.floor(Math.random() * songs.length);
        const currentSong = songs[currentSongIndex];

        if (!currentSong) return;
        setCurrentMusic({
          playlist: playlist,
          songs: songs,
          song: currentSong,
        });
        setIsPlaying(true);
      })
      .catch((err) => {
        console.log(err);
        setIsPlaying(false);
      });
  };

  return (
    <PlayButton
      isPlaying={isPlayingPlaylist && isPlaying}
      onClick={handleClick}
      size="md"
      className="bg-green-500 hover:bg-green-400"
    />
  );
}

export default CardPlayButton;
