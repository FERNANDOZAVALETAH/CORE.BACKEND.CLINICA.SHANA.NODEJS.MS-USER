import { ApiProperty } from '@nestjs/swagger';
import {
  ResponseGetCalendarDto,
  ResponseGetClientDto,
  ResponseGetProfileDto,
} from 'src/modules/client/dto';

export class ResponseGenericDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  operation: string;

  @ApiProperty()
  data: ResponseGetClientDto | ResponseGetProfileDto | ResponseGetCalendarDto;
}
