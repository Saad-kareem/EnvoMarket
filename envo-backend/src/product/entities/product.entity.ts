import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  price: number;
  @Column({ nullable: true })
  category: string;
  @Column({ nullable: true })
  imagePath: string;
}
