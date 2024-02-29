import React, { FC, useState } from "react";
import { VideoItem } from "../video-item";
import { VideoControll } from "../videoControll";
import { Video_Urls } from "../../constants";

export const Home: FC = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div>
      {showPlayer ? (
        <>
          {Video_Urls?.map((video) => (
            <div>
              <VideoItem url={video} />
            </div>
          ))}
          <VideoControll />
        </>
      ) : (
        <button onClick={() => setShowPlayer(true)}>Show</button>
      )}
    </div>
  );
};
