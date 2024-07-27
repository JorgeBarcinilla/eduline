import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 *
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Este endpoint trae el Hola Mundo!!
   * @returns {string} - Texto de hola mundo
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
