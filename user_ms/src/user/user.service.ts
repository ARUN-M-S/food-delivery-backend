import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/common/dtos/create-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../common/schemas/customer.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
      ) {}
    async createCustomer(data:CreateCustomerDto){
        const Customer = new this.customerModel(data);
        const result = await Customer.save();
        console.log(result,"Customer")
        return result
    }
}
