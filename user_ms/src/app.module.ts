import { Module } from '@nestjs/common';
import { HealthController } from './user/health.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
