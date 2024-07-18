import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  items: {
    name: string;
    quantity: number;
    totalPrice: number;
  }[];
  @Column({ nullable: true })
   status : string
  @Column({ nullable: true })
  sessionId: string;
}
