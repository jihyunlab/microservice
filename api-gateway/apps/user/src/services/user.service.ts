import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectQueue('USER_QUEUE') private userQueue: Queue
  ) {}

  async create(email: string, password: string, name: string, role: string[]) {
    try {
      const user = await this.userModel.findOne({ email: email });

      if (user) {
        return -1;
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
      return -2;
    }
  }

  async delete(email: string) {
    try {
      const job = await this.userQueue.add('delete', {
        email: email,
      });

      return job;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
