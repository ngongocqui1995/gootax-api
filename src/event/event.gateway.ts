import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventChatDTO, TicketEventType } from './dto/event-chat.dto';

@WebSocketGateway()
@Injectable()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleEvent(
    @MessageBody() data: EventChatDTO,
    @ConnectedSocket() client: Socket,
  ): Promise<boolean> {
    switch (data.cmd_type) {
      case TicketEventType.MESSAGE:
        client.broadcast.to(data.room_id).emit('message', {
          cmd_type: TicketEventType.MESSAGE,
          room_id: data.room_id,
          message: data.message,
        });
        return true;
      case TicketEventType.JOIN:
        client.join(data.room_id);
        return true;
      case TicketEventType.LEAVE:
        client.leave(data.room_id);
        return true;
    }
  }
}
