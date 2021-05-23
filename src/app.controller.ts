import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  app(): object {
    return ({
      app: 'Todo Server', version: '1.0'
    })
  }
}
