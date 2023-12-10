import { differenceInWeeks } from 'date-fns';

export const calculatePregnancyWeek = (dueDate: string | Date): number => {
  const today = new Date();
  const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
  return differenceInWeeks(due, today); // TODO : 피드백 받는 대로 수정
};
