import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Calendars,
  CalendarsSchema,
  Profiles,
  ProfilesSchema,
  Users,
  UsersSchema,
} from 'src/common/schemas';
import { FnGetCalendarService, FnRegisterCalendarService } from './services';
import { CalendarController } from './calendar.controller';
import { CalendarTcpController } from './calendar.tcp.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Calendars.name,
        schema: CalendarsSchema,
      },
    ]),
  ],
  controllers: [CalendarController, CalendarTcpController],
  providers: [FnGetCalendarService, FnRegisterCalendarService],
})
export class CalendarModule {}
