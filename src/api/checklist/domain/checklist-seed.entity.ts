import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('checklist_seed')
export class ChecklistSeedEntity {
  @PrimaryGeneratedColumn()
  seq: number; // 고유번호

  @Column()
  weekNumber: number; // 주차

  @Column()
  content: string; // 내용
}
