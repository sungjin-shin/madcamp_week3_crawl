import { Entity, Column, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @Column()
  name!: string;

  @PrimaryColumn()
  email!: string;

  @Column()
  password!: string;

  static async isExistByEmailPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> {
    const result = await this.findOne({ email, password });
    return result != null;
  }
}
