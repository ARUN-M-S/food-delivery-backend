import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/common/dtos/create-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../common/schemas/customer.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
      ) {}
    async createCustomer(data:CreateCustomerDto){
        try {
            const existing =  await this.customerModel.find({email:data?.email})
            if(existing.length>0){
                return { error: 'Email already exists' };
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const Customer = new this.customerModel({...data,password:hashedPassword});
            const result = await Customer.save();
            return {user:result}
        } catch (error) {
            console.error('❌ User creation failed:', error.message);
            return { error: 'Internal server error' };
        }
       
    }
}
