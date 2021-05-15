import { Store } from 'src/store/store.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('Food')
export class Food extends BaseEntity {
  @PrimaryColumn()
  id_food: string;

  @Column()
  name_food: string;

  @Column()
  price_food: number;

  @Column({
    default: true,
  })
  status: boolean;

  @Column({nullable: true})
  img: string;

  @ManyToOne(type => Store, store => store.foods)
  store: Store;
}
