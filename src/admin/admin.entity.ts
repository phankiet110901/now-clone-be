import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { TypeAdmin } from './../enum/type-admin.enum';
@Entity('Admin')
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id_admin: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  avatar_admin: string;

  @Column({
    type: 'enum',
    enum: TypeAdmin,
    default: TypeAdmin.normal,
  })
  type_admin: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
  }  
}
