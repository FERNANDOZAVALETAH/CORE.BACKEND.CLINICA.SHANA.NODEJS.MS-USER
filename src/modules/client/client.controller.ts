import { Controller, Get, Body, UseGuards, Query, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { ResponseGenericDto } from '../../common/dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { FnGetClientService, FnGetTypeClientService } from './services';
import { GetClientCustomException } from 'src/exception';

@Controller('client/v1.0')
export class ClientController {
  constructor(
    private readonly fnGetTypeClientService: FnGetTypeClientService,
    private readonly fnGetClientService: FnGetClientService,
  ) {}

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
  get(
    @Query('type') type: string,
    @Query('value') value: string,
  ): Promise<ResponseGenericDto> {
    return this.fnGetTypeClientService.execute({ type, value });
  }

  @UseGuards(ThrottlerGuard)
  @Throttle()
  @Get('/')
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
  getById(@Param('idUser') idUser: string): Promise<ResponseGenericDto> {
    return this.fnGetClientService.execute(idUser);
  }
}
