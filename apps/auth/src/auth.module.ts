import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { User, UserCollection, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`${process.cwd()}/apps/auth/.env`], isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DATABASE_URL),
    MongooseModule.forFeature([{ name: User.name, collection: UserCollection, schema: UserSchema }]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
