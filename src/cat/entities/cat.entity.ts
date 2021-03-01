import { UserEntity } from "src/user/entities/user.entity";
import { CatColor } from "src/utils/constants";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cat')
export class CatEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: CatColor;

    @ManyToOne(type => UserEntity, user => user.cats)
    @JoinColumn({ name: "userId" })
    user: UserEntity;
} 
