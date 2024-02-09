import { Message } from '../../messages/entity/message.entity';

export interface ServerToClientEvents {
  newMessage: (payload: Message) => void;
}
