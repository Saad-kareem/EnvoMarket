// import { ExecutionContext } from '@nestjs/common';
// import { Constants } from 'util/Constant';
// import { AuthGuard } from '@nestjs/passport';

// export class JwtAuthGuard extends AuthGuard('jwt') {
//   canActivate(context: ExecutionContext) {
//     const ctx = context.switchToHttp();
//     const request = ctx.getRequest<Request>();
//     for (let x = 0; x <= Constants.BY_PASS_URLS.length; x++) {
//       if (request.url == Constants.BY_PASS_URLS[x]) return true;
//     }
//     return super.canActivate(context);
//   }
// }
