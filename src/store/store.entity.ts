import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Food } from 'src/food/food.entity';

@Entity('Store')
export class Store extends BaseEntity {
  @PrimaryColumn()
  id_store: string;

  @Column()
  name_store: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  avatar_store: string;

  @Column({
    default: false
  })
  status: Boolean;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => Food, food => food.store)
  foods: Food[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, +process.env.BCRYPT_SALT);
  }
}
