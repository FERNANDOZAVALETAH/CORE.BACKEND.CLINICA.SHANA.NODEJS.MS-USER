import { InternalServerErrorException } from '@nestjs/common';
import { GENERAL } from '../const/general.const';

export class GetClientException extends InternalServerErrorException {
    constructor() {
      super(`${GENERAL.EXCEPTION_CODE.GET_CLIENT}`);
    }
  }