import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { SCHEMAS } from '../../const/schema.name.const';

export type CalendarsDocument = Calendars & mongoose.Document;

@Schema({ collection: SCHEMAS.CALENDARS, autoIndex: true })
export class Calendars {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
  })
  idUser: mongoose.Types.ObjectId;

  @Prop({ required: true })
  year: string;

  @Prop({})
  month: string;

  @Prop(
    raw([
      {
        idEvent: mongoose.Schema.Types.ObjectId,
        day: String,
        title: String,
        start: String,
        end: String,
        description: String,
        backgroundColor: String,
        borderColor: String
      },
    ]),
  )
  events: Record<string, any>[];

  @Prop({ required: true, default: () => 1 })
  status: number;

  @Prop({ required: true, default: mongoose.now() })
  createdAt: Date;

  @Prop({ required: true, default: mongoose.now() })
  updatedAt: Date;
}

export const CalendarsSchema = SchemaFactory.createForClass(Calendars);
