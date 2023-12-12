import { differenceInWeeks } from 'date-fns';

/**
 * 출산 예정일로부터 임신 주차를 계산합니다. (40 - (출산 예정일 - 오늘) / 7)
 * @param dueDate 출산 예정일
 */
export const calculatePregnancyWeek = (dueDate: string | Date): number => {
  const today = new Date();
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  const pregnancyWeek = 40 - differenceInWeeks(due, today);
  return pregnancyWeek > 0 ? pregnancyWeek : 0;
};
