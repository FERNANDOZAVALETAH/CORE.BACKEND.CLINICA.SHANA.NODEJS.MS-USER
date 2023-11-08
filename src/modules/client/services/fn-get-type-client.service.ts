import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { ResponseGenericDto } from 'src/common/dto';
import { Clients, ClientsDocument } from 'src/common/schemas';
import { ResponseGetClientDto } from '../dto';
import { IGetClient } from '../interfaces';
import { GENERAL } from 'src/const/general.const';
import { GetClientCustomException, GetClientException } from 'src/exception';

@Injectable()
export class FnGetTypeClientService {
  private logger = new Logger(`::${FnGetTypeClientService.name}::`);

  constructor(
    @InjectModel(Clients.name)
    private readonly clientModel: mongoose.Model<ClientsDocument>,
  ) {}

  async execute(igetClient: IGetClient): Promise<ResponseGenericDto> {
    this.logger.debug(`::execute::parameters::${JSON.stringify(igetClient)}`);

    if (igetClient.type != GENERAL.CLIENT.FIND.DNI)
      throw new GetClientCustomException(
        'Error en la opcion de busqueda, tipo no identificado',
      );

    const client = await this.getClientByDni(igetClient.value);

    return <ResponseGenericDto>{
      message: 'PE: Proceso exitoso',
      operation: `::${FnGetTypeClientService.name}::execute`,
      data: <ResponseGetClientDto>{
        idUser: client._id,
        dni: client.dni,
        fisrtName: client.firstName,
        lastName: client.lastName,
        telephone: client.telephone,
      },
    };
  }

  private async getClientByDni(dni: string): Promise<ClientsDocument> {
    try {
      const clientByDni = await this.clientModel.findOne({ dni });
      return clientByDni;
    } catch (error) {
      this.logger.error(error);
      throw new GetClientException();
    }
  }
}
