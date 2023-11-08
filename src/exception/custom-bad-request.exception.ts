import { BadRequestException } from '@nestjs/common';

export class GetClientCustomException extends BadRequestException {
  constructor(message: string) {
    super(`${message}`);
  }
}
