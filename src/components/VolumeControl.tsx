import usePlayerStore from "../store/playerStore";
import { Slider } from "./Slider";

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);

  const onChangeVolume = (value: number[]) => {
    const [newVolume] = value;
    const volumeValue = newVolume / 100;
    setVolume(volumeValue);
  };

  return (
    <Slider
      defaultValue={[100]}
      max={100}
      min={0}
      value={[volume * 100]}
      className="w-[95px]"
      name="volumen"
      onValueChange={onChangeVolume}
    />
  );
};

export default VolumeControl;
