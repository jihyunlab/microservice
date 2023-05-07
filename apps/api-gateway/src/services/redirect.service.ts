import { HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class RedirectService {
  async send(outgoing: string, res: Response) {
    try {
      res.redirect(HttpStatus.TEMPORARY_REDIRECT, outgoing);
    } catch (error) {
      console.log(error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: { code: -3000, message: error },
      };
    }
  }
}
