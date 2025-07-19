import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCustomerDto } from 'src/common/dtos/create-customer.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.create')
  async handleCreate(@Payload() data: CreateCustomerDto) {
    return this.userService.createCustomer(data);
  }

  @MessagePattern('user.login')
  userLogin(@Payload() message: any) {
    console.log('🔥 Received Kafka message on topic "user.login":', message);
    return 'Login received';
  }
}
