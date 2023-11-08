import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ResponseGenericDto } from '../../common/dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { GetClientCustomException } from 'src/exception';
import { FnGetCalendarService } from './services';

@Controller('calendar/v1.0/events')
export class CalendarController {
  constructor(private readonly fnGetCalendarService: FnGetCalendarService) {}

  @UseGuards(ThrottlerGuard)
  @Throttle()
  @Get('')
  @ApiCreatedResponse({
    description: 'The get client has been successfully find.',
    type: ResponseGenericDto,
  })
  @ApiConflictResponse({
    description: 'The get client has been failed by conflict',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request Server Exception.',
    type: GetClientCustomException,
  })
  get(): Promise<ResponseGenericDto> {
    return this.fnGetCalendarService.execute();
  }
}
