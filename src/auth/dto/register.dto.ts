import { IsEmail, Length } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;
  @Length(5, 50, { message: 'Password must be in range 5 and 50' })
  password: string;
  name: string;
}
