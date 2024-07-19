// import { CanActivate, ExecutionContext } from '@nestjs/common';

// export class RoleGuard implements CanActivate {
//   private role: string;

//   constructor(role: string) {
//     this.role = role;
//   }
//   canActivate(context: ExecutionContext): boolean {
//     const ctx = context.switchToHttp();
//     const request: any = ctx.getRequest<Request>();
//     if (request.user && this.role === request.user.role) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }
