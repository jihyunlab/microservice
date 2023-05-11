import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';

@Processor('USER_QUEUE')
export class UserConsumer {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  @Process('delete')
  async delete(job: Job) {
    try {
      await this.userModel.deleteOne({ email: job.data['email'] });
    } catch (error) {
      console.log(error);
    }
  }
}
