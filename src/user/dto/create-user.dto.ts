import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty({message: "username không được rỗng"})
  readonly username: string;

  @IsNotEmpty({message: "Định dạnh email không đúng"})
  readonly email: string;

  @IsNotEmpty({message: "Password không được trống"})
  readonly password: string;
}
