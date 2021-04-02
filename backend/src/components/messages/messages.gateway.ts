import {
  ConnectedSocket,
  MessageBody, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from '@components/messages/messages.service';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';

// TODO: add authentication

@WebSocketGateway()
export class MessagesGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private readonly messages: MessagesService) {
    this.messages.messageSaved.subscribe(message => {
      this.server.to(message.toUserId).emit('newMessage', message);
      this.server.to(MessagesGateway.getRoomName(message.fromUserId, message.toUserId)).emit('message', message);
    });
  }

  private static getRoomName(fromUserId: string, toUserId: string): string {
    return [fromUserId, toUserId].sort().join('_');
  }

  @SubscribeMessage('message')
  @UsePipes(ValidationPipe)
  async handleMessage(@MessageBody() message: CreateMessageDto): Promise<void> {
    await this.messages.save(message);
  }

  @SubscribeMessage('messagesOpen')
  handleMessagesOpen(@ConnectedSocket() client: Socket,
                     @MessageBody() data: {fromUserId: string, toUserId: string}): void {
    client.leaveAll();
    client.join([MessagesGateway.getRoomName(data.fromUserId, data.toUserId), data.fromUserId]);
  }

  @SubscribeMessage('userIsOnline')
  handleUserIsOnline(@ConnectedSocket() client: Socket,
                     @MessageBody() data: {userId: string}): void {
    client.join(data.userId);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    client.leaveAll();
  }
}
