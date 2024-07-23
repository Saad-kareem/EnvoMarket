import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
   @PrimaryGeneratedColumn()
    id : number
  @Column({ nullable: true })
  FullName: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  Subject: string;
  @Column({ nullable: true })
  Message: string;
}
