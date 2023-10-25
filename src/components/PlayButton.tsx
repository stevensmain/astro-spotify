import Pause from "@icons/Pause";
import Play from "@icons/Play";

interface Props {
  isPlaying: boolean;
  onClick?: () => void;
  className?: string;
  size: "sm" | "md" | "lg";
}

function PlayButton({ onClick, className, isPlaying, size }: Props) {
  const iconClassnames = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const paddingSize = {
    sm: "p-2",
    md: "p-3",
    lg: "p-4",
  };

  return (
    <button
      onClick={onClick}
      className={`
      card-play-button 
      rounded-full 
      text-black
      transition-all
      hover:scale-105
      bg-white-500
      ${paddingSize[size]}
      ${className}`}
    >
      {isPlaying ? (
        <Pause className={iconClassnames[size]} />
      ) : (
        <Play className={iconClassnames[size]} />
      )}
    </button>
  );
}

export default PlayButton;
