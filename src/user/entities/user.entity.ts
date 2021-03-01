import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CatEntity } from "src/cat/entities/cat.entity";
import { Exclude } from "class-transformer";

@Entity('user')
export class UserEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({unique: true})
  email: string;

  @Column({default: ''})
  bio: string;

  @Column({default: ''})
  image: string;

  @Column()
  @Exclude({toPlainOnly: true})
  password: string;
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password,10);
  }

  @OneToMany(type => CatEntity, cat => cat.user)
  cats: CatEntity[];
}
