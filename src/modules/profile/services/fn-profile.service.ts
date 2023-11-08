import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ResponseGenericDto } from 'src/common/dto';
import {
  Profiles,
  ProfilesDocument,
  Users,
  UsersDocument,
} from 'src/common/schemas';
import {
  ResponseGetClientDto,
  ResponseGetProfileDto,
} from 'src/modules/client/dto';

@Injectable()
export class FnProfileService {
  private logger = new Logger(`::${FnProfileService.name}::`);

  constructor(
    @InjectModel(Profiles.name)
    private readonly profileModel: mongoose.Model<ProfilesDocument>,
    @InjectModel(Users.name)
    private readonly userModel: mongoose.Model<UsersDocument>,
  ) {}

  async execute(idUser: string): Promise<ResponseGenericDto> {
    try {
      this.logger.debug(`::execute::parameters::${idUser}`);
      const profile = await this.profileModel.findOne({
        idUser: mongoose.Types.ObjectId(idUser),
      });
      const user = await this.userModel.findById(idUser);

      return <ResponseGenericDto>{
        message: 'PE: Proceso exitoso',
        operation: `::${FnProfileService.name}::execute`,
        data: <ResponseGetProfileDto>{
          idUser,
          firstName: user.firstName,
          lastName: user.lastName,
          nickName: profile.nickName,
          email: profile.email,
          role: profile.role,
        },
      };
    } catch (error) {}
  }
}
