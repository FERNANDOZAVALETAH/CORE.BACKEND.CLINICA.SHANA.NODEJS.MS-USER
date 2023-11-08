import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ResponseGenericDto } from 'src/common/dto';
import { Calendars, CalendarsDocument } from 'src/common/schemas';
import { ResponseGetCalendarDto } from 'src/modules/client/dto';

@Injectable()
export class FnGetCalendarService {
  private logger = new Logger(`::${FnGetCalendarService.name}::`);

  constructor(
    @InjectModel(Calendars.name)
    private readonly calendarModel: mongoose.Model<CalendarsDocument>,
  ) {}

  async execute(): Promise<ResponseGenericDto> {
    this.logger.debug(`::execute::parameters::`);

    try {
      const calendar = await this.calendarModel.findOne({
        //idUser: new mongoose.Types.ObjectId('652b4fcbb8385377ea1a9cc9'),
        year: '2023',
        month: '11',
      });

      if (!calendar) {
        return {
          operation: 'Proceso exitoso',
          message: `${FnGetCalendarService.name}`,
          data: <ResponseGetCalendarDto>{},
        };
      }

      return {
        operation: 'Proceso exitoso',
        message: `${FnGetCalendarService.name}`,
        data: <ResponseGetCalendarDto>{
          idCalendar: calendar._id,
          year: calendar.year,
          month: calendar.month,
          events: calendar.events,
        },
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
