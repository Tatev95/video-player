import EventEmitter from "../helpers/event-emitter";
import { Player_Event_Types, PLAYER_STATES } from "../constants";

class PlayerProvider {
  private bufferItems: string[] = [];
  public eventEmitter: EventEmitter = new EventEmitter();

  public addBufferingItem(url: string) {
    this.bufferItems.push(url);
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED
    );
  }

  public removeBufferingItem(url: string) {
    const i = this.bufferItems.indexOf(url);

    if (i !== -1) {
      this.bufferItems.splice(i, 1);
      if (this.bufferItems.length === 0) {
        this.eventEmitter.emit(
          Player_Event_Types.STATE_CHANGE,
          PLAYER_STATES.PLAYING
        );
      }
    }
  }

  public play() {
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PLAYING
    );
  }

  public pause() {
    this.eventEmitter.emit(
      Player_Event_Types.STATE_CHANGE,
      PLAYER_STATES.PAUSED
    );
  }

  public jump(time: number) {
    this.eventEmitter.emit(Player_Event_Types.TIME_UPDATE, time);
  }

  public setVolume(volume: number) {
    this.eventEmitter.emit(Player_Event_Types.VOLUME_CHANGE, volume);
  }

  public setSpeed(speed: number) {
    this.eventEmitter.emit(Player_Event_Types.SPEED_CHANGE, speed);
  }
}

export const playerProvider = new PlayerProvider();
