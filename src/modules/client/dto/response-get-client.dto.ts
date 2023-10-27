import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetClientDto {

  @ApiProperty()
  idUser: string;

  @ApiProperty()
  fisrtName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  telephone: string;

}
