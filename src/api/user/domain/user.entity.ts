import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  seq: number; // 고유번호

  @Column()
  nickname: string; // 이름

  @Column()
  dueDate: string; // 출산 예정일 (YYYY-MM-DD 형식)
}
