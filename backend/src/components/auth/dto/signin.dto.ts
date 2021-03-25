import { ISigninDto } from '@monorepo/types/auth/signin.dto.interface';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigninDto implements ISigninDto {
  @IsEmail({require_tld: false})
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
