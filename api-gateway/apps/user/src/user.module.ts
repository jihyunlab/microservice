import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User, UserCollection, UserSchema } from './schemas/user.schema';
import { UserConsumer } from './consumers/user.consumer';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`${process.cwd()}/apps/user/.env`], isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    MongooseModule.forFeature([{ name: User.name, collection: UserCollection, schema: UserSchema }]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'USER_QUEUE',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserConsumer],
})
export class UserModule {}
