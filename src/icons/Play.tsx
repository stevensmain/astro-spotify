interface Props {
  className?: string;
}

const Play = ({ className = "h-3 w-3" }: Props) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path>
    </svg>
  );
};

export default Play;
