import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io'
@WebSocketGateway({
    // cors:{
    //     origin:
    // }
})
export class MyGateWay {
    // implements OnModuleInit {

    // @WebSocketServer()
    // server: Server;

    // onModuleInit() {
    //     this.server.on('connection', (soket) => {
    //         console.log(soket.id);
    //         console.log("connected");

    //     })
    // }

    // @SubscribeMessage('newMessage')
    // onNewMesage(@MessageBody() body: any) {
    //     console.log(body);
    //     this.server.emit('onMessage', {
    //         mgs: "New Message",
    //         content: body
    //     })
    // }
}