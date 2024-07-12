import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  items: {
    name: string;
    quantity: number;
    totalPrice: number;
  }[];
  @Column({ nullable: true })
  userEmail: string;
  @Column({ nullable: true })
  userAddress: string;
  @Column({ nullable: true })
  TotalPrice: number;
  // @ManyToOne(() => User, (user) => user.order)
  // user: User;
}
