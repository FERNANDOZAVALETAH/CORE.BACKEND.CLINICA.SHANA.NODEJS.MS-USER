import { Injectable, Logger } from '@nestjs/common';
import { IRegisterCalendar } from '../interfaces';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Calendars, CalendarsDocument } from 'src/common/schemas';

@Injectable()
export class FnRegisterCalendarService {
  private logger = new Logger(`::${FnRegisterCalendarService.name}::`);

  constructor(
    @InjectModel(Calendars.name)
    private readonly calendarModel: mongoose.Model<CalendarsDocument>,
  ) {}

  async execute(iregisterCalendar: IRegisterCalendar) {
    try {
      this.logger.debug(
        `::execute::parameters::${JSON.stringify(iregisterCalendar)}`,
      );

      const { day, month, year, title, start, end, description, isConsulting } =
        iregisterCalendar;

      const calendar = await this.calendarModel.findOne({ year, month });

      const event: any = {
        idEvent: new mongoose.Types.ObjectId(),
        title,
        day,
        description,
        start,
        end,
        backgroundColor: (isConsulting) ? "#00d68f" : "#0095ff",
        borderColor: (isConsulting) ? "#00d68f" : "#0095ff"
      };

      if (!calendar) {
        const events: any[] = [event];

        await this.calendarModel.create({
          month,
          year,
          events,
        });
      } else {
        await this.calendarModel.findByIdAndUpdate(calendar._id, {
          $addToSet: {
            events: event,
          },
        });
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
