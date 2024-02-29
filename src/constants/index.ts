export const Message_Types = {
  NEW_MESSAGE: "new_message",
  LOAD_MESSAGES: "load_messages",
};

export const Messages_Event_Types = {
  ADD_MESSAGE: "add_message",
  UPDATE_MESSAGES: "update_messages",
};

export const Player_Event_Types = {
  STATE_CHANGE: "STATE_CHANGE",
  TIME_UPDATE: "TIME_UPDATE",
  VOLUME_CHANGE: "VOLUME_CHANGE",
  SPEED_CHANGE: "SPEED_CHANGE",
};

export enum PLAYER_STATES {
  PLAYING,
  PAUSED,
}

export const Video_Urls = [
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
];
