import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column()
  name!: string;

  @PrimaryColumn()
  email!: string;

  @Column()
  password!: string;
}
