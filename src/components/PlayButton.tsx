import { useState } from "react";
import Pause from "@icons/Pause";
import Play from "@icons/Play";

type Type = "player" | "card";
type Size = "small" | "mid";

function PlayButton({ size = "small", type }: { size?: Size; type: Type }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={handleClick}
      className={`"card-play-button 
      rounded-full 
      text-black
      transition-all
      hover:scale-105
      ${size === "small" ? "p-2" : "p-4"}
      ${type === "player" ? "bg-white  " : "bg-green-500 hover:bg-green-400"}`}
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
}

export default PlayButton;
