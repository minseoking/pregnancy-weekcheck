import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { calculatePregnancyWeek } from '../../../global/util/date.util';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  seq: number; // 고유번호

  @Column()
  nickname: string; // 이름

  @Column()
  dueDate: string; // 출산 예정일 (YYYY-MM-DD 형식)

  static from(seq: number, nickname: string, dueDate: string) {
    const user = new UserEntity();
    user.seq = seq;
    user.nickname = nickname;
    user.dueDate = dueDate;
    return user;
  }

  update(nickname: string, dueDate: string) {
    if (nickname) this.nickname = nickname;
    if (dueDate) this.dueDate = dueDate;
  }

  getPregnancyWeek() {
    return calculatePregnancyWeek(this.dueDate);
  }
}
