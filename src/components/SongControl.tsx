import { useEffect, useState } from "react";
import { Slider } from "./Slider";
import usePlayerStore from "src/store/playerStore";

const SongControl = ({
  audio,
}: {
  audio: React.RefObject<HTMLAudioElement>;
}) => {
  const currentMusic = usePlayerStore((state) => state.currentMusic);
  const setCurrentMusic = usePlayerStore((state) => state.setCurrentMusic);
  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    if (currentTime === duration) {
      const currentSong = currentMusic.song;

      if (!currentSong || !currentMusic.songs) return;

      const nextSongIndex = currentMusic.songs.indexOf(currentSong) + 1;
      const nextSong = currentMusic.songs[nextSongIndex];

      if (!nextSong) {
        setIsPlaying(false);
        return;
      }

      setCurrentMusic({ ...currentMusic, song: nextSong });
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current?.currentTime ?? 0);
  };

  const onChangeTime = (value: number[]) => {
    const [newCurrentTime] = value;
    setCurrentTime(newCurrentTime);
    if (audio.current) audio.current.currentTime = newCurrentTime;
  };

  const formatTime = (time: number) => {
    if (time == null) return `0:00`;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>

      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[400px]"
        onValueChange={onChangeTime}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
};

export default SongControl;
