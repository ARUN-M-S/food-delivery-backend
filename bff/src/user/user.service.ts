import { OnModuleInit,Inject,Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(@Inject('USER_SERVICE')private readonly client: ClientKafka) {}
    async onModuleInit() {
        this.client.subscribeToResponseOf('user.create');
        this.client.subscribeToResponseOf('user.login');
        await this.client.connect();
      }      
    emitUserCreate(data: any) {
        console.log('📤 BFF sending user.create:', data);
        return this.client.send('user.create', data);
      }
    emitUserLogin(data:any){
        console.log('📤 BFF sending user.login:', data);
        return this.client.send('user.login', data);
    }
}
