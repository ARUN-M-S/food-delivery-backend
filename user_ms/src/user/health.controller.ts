import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('/ping')
  ping() {
    return { message: 'User MS is alive (HTTP)' };
  }
}
