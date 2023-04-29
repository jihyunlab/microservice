import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { from } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserCreateReqDto } from '../dtos/create.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: '/user/create' })
  async create(dto: UserCreateReqDto) {
    const id = await this.userService.create(dto.email, dto.password, dto.name, dto.role);

    if (!id) {
      return from([{ status: HttpStatus.INTERNAL_SERVER_ERROR, body: { code: -1, message: 'User creation failed' } }]);
    }

    return from([{ status: HttpStatus.CREATED, body: { code: 0, message: 'User created' } }]);
  }
}
