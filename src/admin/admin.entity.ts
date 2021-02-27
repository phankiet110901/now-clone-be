import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('Admin')
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id_admin: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  avatar_admin: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
  }
}
