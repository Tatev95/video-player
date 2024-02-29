import EventEmitter from '../helpers/event-emitter';
import { io, Socket } from 'socket.io-client';
import { Message_Types, Messages_Event_Types } from '../constants';
import { Message } from '../types';

class SignalingProvider {

  private socket: Socket | null = null;
  public eventEmitter: EventEmitter = new EventEmitter();

  public init() {
    this.socket = io('http://localhost:3004');

    this.socket.on(Message_Types.NEW_MESSAGE, this.onNewMessage);
    this.socket.on(Message_Types.LOAD_MESSAGES, this.onLoadMessages);
  }

  private onNewMessage(message: Message) {
    this.eventEmitter.emit(Messages_Event_Types.ADD_MESSAGE, message);
  }

  private onLoadMessages(messages: Message[]) {
    this.eventEmitter.emit(Messages_Event_Types.UPDATE_MESSAGES, messages);
  }

  public sendMessage(type: string, data: any) {
    if (!this.socket) {
      console.log('Socket is not initialized!');
      return;
    }
    this.socket.emit(type, data);
  }
}

export const signalingProvider = new SignalingProvider();
