import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCustomerDto } from 'src/common/dtos/create-customer.dto';
import { LoginCustomerDto } from 'src/common/dtos/login-customer.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('user.create')
  async handleCreate(@Payload() data: CreateCustomerDto) {
    return this.userService.createCustomer(data);
  }

  @MessagePattern('user.login')
  userLogin(@Payload() data: LoginCustomerDto) {
    return this.userService.loginCustomer(data)
  }

  @MessagePattern('user.update')
  async handleUpdate(@Payload() data: CreateCustomerDto) {
    return this.userService.updateCustomer(data);
  }
}
