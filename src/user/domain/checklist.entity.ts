import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('checklist')
export class ChecklistEntity {
  @PrimaryGeneratedColumn()
  seq: number; // 고유번호

  @ManyToOne(() => UserEntity)
  user: UserEntity; // 유저

  @Column()
  weekNumber: number; // 주차

  @Column()
  content: string; // 내용

  @Column()
  isCompleted: boolean; // 완료 여부

  @CreateDateColumn()
  createdAt: Date; // 생성일

  @DeleteDateColumn()
  deletedAt!: Date | null;

  static create(user: UserEntity, weekNumber: number, content: string) {
    const checklist = new ChecklistEntity();
    checklist.user = user;
    checklist.weekNumber = weekNumber;
    checklist.content = content;
    checklist.isCompleted = false;
    return checklist;
  }

  complete() {
    this.isCompleted = true;
  }
  cancelComplete() {
    this.isCompleted = false;
  }
}
