import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { ResponseGenericDto } from '../../common/dto';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { FnProfileService } from './services';
import { GetClientCustomException } from 'src/exception';

@Controller('profile/v1.0')
export class ProfileController {
  constructor(private readonly fnProfileService: FnProfileService) {}

  @UseGuards(ThrottlerGuard)
  @Throttle()
  @Get('/:idUser')
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
  get(@Param('idUser') idUser: string): Promise<ResponseGenericDto> {
    return this.fnProfileService.execute(idUser);
  }
}
