import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto implements ISignupDto {
  @IsEmail({require_tld: false})
  @IsNotEmpty()
  email!: string;

  @IsNotEmpty()
  firstName!: string;

  lastName!: string;

  @IsNotEmpty()
  password!: string;
}
