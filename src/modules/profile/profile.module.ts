import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileController } from './profile.controller';
import {
  Profiles,
  ProfilesSchema,
  Users,
  UsersSchema,
} from 'src/common/schemas';
import { FnProfileService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Profiles.name,
        schema: ProfilesSchema,
      },
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [FnProfileService],
})
export class ProfileModule {}
