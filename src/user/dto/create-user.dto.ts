import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { UniqueDB } from 'src/utils/unique.validator';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {

  @IsNotEmpty({message: "username không được rỗng"})
  readonly username: string;
  
  @Validate(UniqueDB,[UserEntity],{message: "email đã tồn tại."})
  @IsEmail({},{message: "Định dạnh email không đúng"})
  readonly email: string;

  @IsNotEmpty({message: "Password không được trống"})
  readonly password: string;
}
//check this to get how to use
//https://gist.github.com/zarv1k/3ce359af1a3b2a7f1d99b4f66a17f1bc
