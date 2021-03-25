import { OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessagesService } from '@components/messages/messages.service';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';
export declare class MessagesGateway implements OnGatewayDisconnect {
    private readonly messages;
    constructor(messages: MessagesService);
    server: Server;
    private static getRoomName;
    handleMessage(client: Socket, message: CreateMessageDto): Promise<void>;
    handleMessagesOpen(client: Socket, data: {
        fromUserId: string;
        toUserId: string;
    }): void;
    handleUserIsOnline(client: Socket, data: {
        userId: string;
    }): void;
    handleDisconnect(client: Socket): void;
}
