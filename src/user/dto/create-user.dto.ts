import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({message: "username không được rỗng"})
  readonly username: string;

  @IsEmail({},{message: "Định dạnh email không đúng"})
  readonly email: string;

  @IsNotEmpty({message: "Password không được trống"})
  readonly password: string;
}
