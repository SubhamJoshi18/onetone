import { LargeNumberLike } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  rating: number;

  @Column()
  marks: number;
}
