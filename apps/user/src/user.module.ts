import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User, UserCollection, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`${process.cwd()}/apps/user/.env`], isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    MongooseModule.forFeature([{ name: User.name, collection: UserCollection, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
