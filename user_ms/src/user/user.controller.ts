import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
    @MessagePattern('user.create')
    handlePing(@Payload() message: any) {
      console.log('🔥 Received Kafka message on topic "user.ping":', message);
      return 'Ping received';
    }

    @MessagePattern('user.login')
    userLogin(@Payload() message: any) {
      console.log('🔥 Received Kafka message on topic "user.login":', message);
      return 'Ping received';
    }
}
