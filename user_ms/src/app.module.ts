import { Module } from '@nestjs/common';
import { HealthController } from './user/health.controller';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
console.log('Loaded MONGO_URL:', process.env.MONGO_URL);


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL || ''),
    UserModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
