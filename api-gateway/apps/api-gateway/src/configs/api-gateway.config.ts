import { HttpStatus } from '@nestjs/common';

export default () => ({
  apis: {
    '/auth/signin': {
      name: 'Sign in',
      tag: 'Auth',
      outgoing: 'http://127.0.0.1:3002/auth/signin',
      transport: 'REDIRECT',
      transport_type: 'MESSAGE',
    },
    '/auth/validate': {
      name: 'Authentication validation',
      tag: 'Auth',
      outgoing: '/auth/validate',
      transport: 'MQTT',
      method: 'MESSAGE',
    },
    '/user/create': {
      name: 'Create user',
      tag: 'User',
      outgoing: '/user/create',
      transport: 'REDIS',
      security: 'JWT',
      method: 'MESSAGE',
    },
    '/user/delete': {
      name: 'Delete user',
      tag: 'User',
      outgoing: '/user/delete',
      transport: 'REDIS',
      security: 'JWT',
      method: 'EVENT',
      preresponse: { status: HttpStatus.ACCEPTED, body: { code: 0, message: 'User will be deleted' } },
    },
  },
});
