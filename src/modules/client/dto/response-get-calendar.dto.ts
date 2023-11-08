import { ApiProperty } from '@nestjs/swagger';

class Events {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;
}

export class ResponseGetCalendarDto {
  @ApiProperty()
  idCalendar: string;

  @ApiProperty()
  year: string;

  @ApiProperty()
  month: string;

  @ApiProperty({ type: [Events], isArray: true })
  events: Events[];
}
