import { AuthGuard } from "@nestjs/passport";

export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<T>(err: unknown, user: T): T | null {
    return user ?? null;
  }
}
