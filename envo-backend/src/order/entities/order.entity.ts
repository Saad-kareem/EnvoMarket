import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json', { nullable: true })
  items: {
    name: string;
    quantity: number;
    Price: number;
  }[];
  @Column({ nullable: true })
  userEmail: string;
  @Column({ nullable: true })
  userAddress: string;
  @Column({ default: 'unpaid' })
  status: string;
  @Column({ nullable: true })
  sessionId: string;
}
