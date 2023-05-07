import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email: email });

    if (user && user.password && bcrypt.compareSync(password, user.password)) {
      return user;
    }

    return null;
  }

  async validateJwt(jwt: string) {
    try {
      return this.jwtService.verify(jwt.replace('Bearer ', ''));
    } catch (error) {
      return -1;
    }
  }

  async signin(email: string, name: string, role: string[]) {
    if (!email) {
      return -1;
    }

    try {
      return this.jwtService.sign({ email: email, name: name, role: role });
    } catch (error) {
      console.log(error);
      return -2;
    }
  }
}
