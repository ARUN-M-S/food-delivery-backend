import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/common/dtos/create-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../common/schemas/customer.schema';
import { Model } from 'mongoose';
import { retry } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
      ) {}
    async createCustomer(data:CreateCustomerDto){
        try {
            const existing =  await this.customerModel.find({email:data?.email})
            if(existing){
                return { error: 'Email already exists' };
            }
            const Customer = new this.customerModel(data);
            const result = await Customer.save();
            console.log(result,"Customer")
            return result
        } catch (error) {
            console.error('❌ User creation failed:', error.message);
            return { error: 'Internal server error' };
        }
       
    }
}
