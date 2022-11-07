import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const payload = verify(accessToken, process.env.JWT_SECRET);
      let user = await this.userService.findByUid(payload['data']['uid']);
      if (!user) {
        user = await this.userService.create(payload['data']);
      }
      req.user = user;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Přístup odepřen, přihlašte se!');
    }
    next();
  }
}
