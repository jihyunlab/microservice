import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(email: string, password: string, name: string, role: string[]): Promise<string | undefined | null> {
    try {
      const user = await this.userModel.findOne({ email: email });

      if (user) {
        return null;
      }

      const hashedPassword = bcrypt.hashSync(password, Number(process.env.BCRYPT_ROUND));

      const result = await this.userModel.create({
        email: email,
        password: hashedPassword,
        name: name,
        role: role,
      });

      return result._id.toString();
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
