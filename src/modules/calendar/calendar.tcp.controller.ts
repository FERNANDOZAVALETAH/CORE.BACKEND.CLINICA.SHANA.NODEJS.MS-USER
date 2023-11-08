import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FnRegisterCalendarService } from './services';
import { IRegisterCalendar } from './interfaces';

@Controller()
export class CalendarTcpController {
  constructor(
    private readonly fnRegisterCalendarService: FnRegisterCalendarService,
  ) {}

  @MessagePattern({ subjet: 'client-user', function: 'calendar-register' })
  registerCalendar(payload: IRegisterCalendar): Promise<void> {
    return this.fnRegisterCalendarService.execute(payload);
  }
}
