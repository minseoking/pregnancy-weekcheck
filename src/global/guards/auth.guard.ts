import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from '../../api/user/application/user.service';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    const userSeq = request.req.headers.userseq;
    // 따로 jwt가 아닌 userseq를 헤더에 사용하기 때문에 db에서 유저가 있는지 확인
    const user = await this.userService.getUserBySeq(userSeq);
    return !!user;
  }
}
