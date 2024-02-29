import React, { useState } from "react";
import { playerProvider } from "../../providers/player-provider";

export const VideoControll = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [speed, setSpeed] = useState(1.0);
  const [jumpValue, setJumpValue] = useState(0);

  const onStateToggle = () => {
    if (isPlaying) {
      playerProvider.pause();
    } else {
      playerProvider.play();
      const interval = setInterval(() => {
        setJumpValue((prev) => prev + (2 - speed));
      }, 1000);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    playerProvider.setVolume(newVolume);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    playerProvider.setSpeed(newSpeed);
  };

  const handleJumpChange = (value: number) => {
    setJumpValue(value);
    playerProvider.jump(value);
  };
  return (
    <div>
      <label>Jump Range:</label>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={jumpValue}
        onChange={(e) => handleJumpChange(parseFloat(e.target.value))}
      />
      <label>Volume:</label>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => {
          handleVolumeChange(parseFloat(e.target.value));
        }}
      />
      <label>Speed:</label>
      <input
        type="range"
        min={0.5}
        max={2}
        step={0.1}
        value={speed}
        onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
      />
      <button onClick={onStateToggle}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};
