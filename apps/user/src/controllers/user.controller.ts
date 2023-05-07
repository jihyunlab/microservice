import { Controller, HttpStatus } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { from } from 'rxjs';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: '/user/create' })
  async create(req: any) {
    const id = await this.userService.create(req.body.email, req.body.password, req.body.name, req.body.role);

    if (id === -1) {
      return from([{ status: HttpStatus.BAD_REQUEST, body: { code: -1, message: 'This user already exists' } }]);
    } else if (id === -2) {
      return from([{ status: HttpStatus.INTERNAL_SERVER_ERROR, body: { code: -2, message: 'User creation failed' } }]);
    }

    return from([{ status: HttpStatus.CREATED, body: { code: 0, message: 'User created' } }]);
  }

  @EventPattern({ cmd: '/user/delete' })
  async delete(req: any) {
    this.userService.delete(req.body.email);
  }
}
