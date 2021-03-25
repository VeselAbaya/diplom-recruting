import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';
export declare class SignupDto implements ISignupDto {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}
