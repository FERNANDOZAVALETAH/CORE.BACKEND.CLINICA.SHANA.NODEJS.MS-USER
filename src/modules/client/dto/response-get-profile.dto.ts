import { ApiProperty } from '@nestjs/swagger';

export class ResponseGetProfileDto {
  @ApiProperty()
  idUser: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
