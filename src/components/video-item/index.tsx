import React, { FC, useEffect } from "react";
import { playerProvider } from "../../providers/player-provider";
import { Player_Event_Types, PLAYER_STATES } from "../../constants";

type Props = {
  url: string;
};

export const VideoItem: FC<Props> = ({ url }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stateChangeOff = playerProvider.eventEmitter.on(
      Player_Event_Types.STATE_CHANGE,
      onStateChange
    );
    const timeUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.TIME_UPDATE,
      onTimeUpdate
    );
    const speedUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.SPEED_CHANGE,
      onSpeedUpdate
    );

    const volumeUpdateOff = playerProvider.eventEmitter.on(
      Player_Event_Types.VOLUME_CHANGE,
      onVolumeUpdate
    );

    return () => {
      stateChangeOff();
      timeUpdateOff();
      speedUpdateOff();
      volumeUpdateOff();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const onCanPlay = () => {
      playerProvider.removeBufferingItem(url);
    };

    const onWaiting = () => {
      playerProvider.addBufferingItem(url);
    };

    if (video) {
      video.addEventListener("canplay", onCanPlay);
      video.addEventListener("waiting", onWaiting);
    }

    return () => {
      video?.removeEventListener("canplay", onCanPlay);
      video?.removeEventListener("waiting", onWaiting);
    };
  }, [videoRef.current]);

  const onStateChange = (state: number) => {
    switch (state) {
      case PLAYER_STATES.PLAYING: {
        videoRef.current?.play();
        break;
      }
      case PLAYER_STATES.PAUSED: {
        videoRef.current?.pause();
        break;
      }
    }
  };

  const onTimeUpdate = (time: number) => {
    videoRef.current && (videoRef.current.currentTime = time);
  };

  const onSpeedUpdate = (speed: number) => {
    videoRef.current && (videoRef.current.playbackRate = speed);
  };

  const onVolumeUpdate = (volume: number) => {
    videoRef.current && (videoRef.current.volume = volume);
  };

  return (
    <div>
      <video ref={videoRef} src={url} width={640} height={360} />
    </div>
  );
};
