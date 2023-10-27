import { ConflictException } from '@nestjs/common';

export class InvalidTokenCustomException extends ConflictException {
  constructor(tokenException: string, idUserException: string) {
    super(
      `token ingresado es incorrecto [token:${tokenException} idUser:${idUserException}]`,
    );
  }
}

export class InvalidClientConflictException extends ConflictException {
  constructor(idUserException: string) {
    super(
      `usuario ingresado es incorrecto [idUser:${idUserException}]`,
    );
  }
}

