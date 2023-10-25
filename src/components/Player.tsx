import { useEffect, useRef } from "react";
import usePlayerStore from "src/store/playerStore";
import PlayButton from "./PlayButton";
import VolumeControl from "./VolumeControl";

const Player = () => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const { song, playlist } = usePlayerStore((state) => state.currentMusic);
  const volume = usePlayerStore((state) => state.volume);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying, audioRef]);

  useEffect(() => {
    if (song && audioRef.current) {
      const src = `/music/${playlist?.id}/0${song?.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.play();
    }
  }, [song, playlist, audioRef]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-row justify-between w-full px-1 z-50">
      <div className="w-[200px]">
        <CurrentSong
          image={song?.image ?? ""}
          title={song?.title ?? ""}
          artists={song?.artists ?? []}
        />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center flex-col items-center">
          <PlayButton
            size="sm"
            isPlaying={isPlaying}
            onClick={handleClick}
            className="bg-white"
          />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
};

const CurrentSong = ({
  image,
  title,
  artists,
}: {
  image: string;
  title: string;
  artists: string[];
}) => {
  const formattedArtist = new Intl.ListFormat("en", {
    localeMatcher: "best fit",
  }).format(artists);

  return (
    <div className="flex items-center gap-5 relative  overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">{formattedArtist}</span>
      </div>
    </div>
  );
};

export default Player;
