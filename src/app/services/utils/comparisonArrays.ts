import { Answer, IFeedbackQuestion } from '@/app/api/types';

export const comparisonArrays = (
  firstArray?: Answer[],
  secondArray?: IFeedbackQuestion[],
) => {
  if (!firstArray || !secondArray) {
    return true;
  }

  const set = new Set();
  const requiredSet = new Set();

  firstArray.forEach((answer) => set.add(answer.question_uuid));
  secondArray.forEach((item) => item.required && requiredSet.add(item.uuid));

  if (set.size >= requiredSet.size) {
    for (const item of requiredSet) {
      if (!set.has(item)) {
        return true;
      }
    }
    return false;
  }

  return true;
};
