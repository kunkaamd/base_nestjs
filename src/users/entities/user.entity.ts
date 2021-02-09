import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column()
  password: string;
  
}
