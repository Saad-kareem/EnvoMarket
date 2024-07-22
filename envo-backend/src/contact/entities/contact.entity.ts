import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
   @PrimaryGeneratedColumn()
    id : number
  @Column()
  FullName: string;
  @Column()
  email: string;
  @Column()
  Subject: string;
  @Column()
  Message: string;
}
