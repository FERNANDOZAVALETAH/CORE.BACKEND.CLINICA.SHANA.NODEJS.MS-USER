import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientController } from './client.controller';
import { Clients, ClientsSchema } from 'src/common/schemas';
import { FnGetClientService, FnGetTypeClientService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Clients.name,
        schema: ClientsSchema,
      },
    ]),
  ],
  controllers: [ClientController],
  providers: [FnGetClientService, FnGetTypeClientService],
})
export class ClientModule {}
