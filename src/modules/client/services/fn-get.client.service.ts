import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ResponseGenericDto } from "src/common/dto";
import { Clients, ClientsDocument } from 'src/common/schemas';
import { GetClientException, InvalidClientConflictException } from 'src/exception';
import { ResponseGetClientDto } from '../dto';

@Injectable()
export class FnGetClientService {
    private logger = new Logger(`::${FnGetClientService.name}::`);

    constructor(
        @InjectModel(Clients.name)
        private readonly clientModel: mongoose.Model<ClientsDocument>
      ) {}

    async execute(idUser: string): Promise<ResponseGenericDto> {
        this.logger.debug(
            `::execute::parameters::${JSON.stringify(idUser)}`,
        );
        
        try {
            const client = await this.clientModel.findById(idUser)
            if(!client)
                throw new InvalidClientConflictException(idUser);

            return <ResponseGenericDto> {
                message: 'Processo exitoso',
                operation: `::${FnGetClientService.name}::execute`,
                data: <ResponseGetClientDto>{
                  idUser: client._id,
                  dni: client.dni,
                  fisrtName: client.firstName,
                  lastName: client.lastName,
                  telephone: client.telephone
                }
            }

        } catch (error) {
            this.logger.error(error);
            throw new GetClientException();
        }
    }
}