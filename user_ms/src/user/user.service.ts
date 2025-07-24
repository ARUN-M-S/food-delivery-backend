import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/common/dtos/create-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../common/schemas/customer.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginCustomerDto } from 'src/common/dtos/login-customer.dto';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret';

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

    async loginCustomer(data:LoginCustomerDto){
        try {
            const existing =  await this.customerModel.find({email:data?.email})
            if(existing.length==0){
                return { error: 'Customer Not Found' };
            }
            const isPasswordValid = await bcrypt.compare(data.password, existing[0].password);
            if (!isPasswordValid) {
              return { error: 'Invalid email or password' };
            }
            const payload = { id: existing[0]._id, email: existing[0].email, role: existing[0].role };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
            const user = {
                id: existing[0]._id,
                email: existing[0].email,
                fullName: existing[0].fullName,
                role: existing[0].role
              };
              return { token, user };
        } catch (error) {
            console.error('❌ User creation failed:', error.message);
            return { error: 'Internal server error' };
        }
        
    }
    async updateCustomer(data:CreateCustomerDto){
        try {
            const existing =  await this.customerModel.find({email:data?.email})
        if(existing.length==0){
            return { error: 'Customer Not Found' };
        }
            
        } catch (error) {
           console.log(error,"update error") 
        }
        
    }
}
