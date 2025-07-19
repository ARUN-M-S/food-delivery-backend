import { OnModuleInit,Inject,Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { kafkaTopics } from 'src/constants/kafka-topics';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(@Inject('USER_SERVICE')private readonly client: ClientKafka) {}
    async onModuleInit() {
       
        kafkaTopics.forEach(topic => this.client.subscribeToResponseOf(topic));
        await this.client.connect();
      }      
    emitUserCreate(data: any) {
        return firstValueFrom(this.client.send('user.create', data));
      }
    emitUserLogin(data:any){
        return  firstValueFrom(this.client.send('user.login', data));
    }
}
