import { Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../guards/localauth.guard';
import { MessagePattern } from '@nestjs/microservices';
import { from } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signin(@Req() req: Request, @Res() res: Response) {
    const jwt = await this.authService.signin(req.user['email'], req.user['name'], req.user['role']);

    if (jwt === -1) {
      return res.status(HttpStatus.BAD_REQUEST).send({ code: -1, message: 'User verification failed' });
    } else if (jwt === -2) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ code: -2, message: 'Sign in failed' });
    }

    return res.status(HttpStatus.CREATED).send({ code: 0, message: 'Sign in was successful', access_token: jwt });
  }

  @MessagePattern({ cmd: '/auth/validate' })
  async validate(req: any) {
    const id = await this.authService.validateJwt(req.headers.authorization);

    if (id === -1) {
      return from([
        { status: HttpStatus.UNAUTHORIZED, body: { code: -1, message: 'Authentication validation failed' } },
      ]);
    }

    return from([
      { status: HttpStatus.CREATED, body: { code: 0, message: 'Authentication validation was successful' } },
    ]);
  }
}
