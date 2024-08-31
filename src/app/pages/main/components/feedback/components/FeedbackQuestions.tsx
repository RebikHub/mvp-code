import { FC, Fragment, useEffect, useState } from 'react';

import { Checkbox } from '@/app/components/ui-kit/checkbox/Checkbox';
import { Radio } from '@/app/components/ui-kit/radio/Radio';
import { TextArea } from '@/app/components/ui-kit/text-area/TextArea';

import {
  Answer,
  IFeedbackAnswerOption,
  IFeedbackQuestion,
} from '@/app/api/types';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { generateArray } from '@/app/services/utils/generateArray';
import { validateTextRequired } from '@/app/services/validators/validators';

import { QuestionType } from '@/app/types/enums';

import css from './FeedbackQuestions.module.scss';

type Props = {
  questions: IFeedbackQuestion[];
  setData: (data: any) => void;
};

export const FeedbackQuestions: FC<Props> = ({ questions, setData }) => {
  const [answers, setAnswers] = useState<Answer[] | null>(null);

  const { formState, watch } = useFormManagement();

  const handleCheckbox = (
    check: boolean,
    option: IFeedbackAnswerOption,
    id: string,
  ) => {
    setAnswers((prev) => {
      if (!prev || prev?.length === 0) {
        return [
          {
            question_uuid: id,
            payload: [option],
          },
        ];
      }

      const findItem = prev.find((item) => item.question_uuid === id);

      if (findItem) {
        if (check) {
          return [
            ...prev.map((item) => {
              if (item.question_uuid === id) {
                return {
                  ...item,
                  payload: [
                    ...(item.payload as IFeedbackAnswerOption[]),
                    option,
                  ],
                };
              }
              return { ...item };
            }),
          ];
        }

        return [
          ...prev.map((item) => {
            if (item.question_uuid === id) {
              return {
                ...item,
                payload: [
                  ...(item.payload as IFeedbackAnswerOption[]).filter(
                    (payload) => payload.id !== option.id,
                  ),
                ],
              };
            }
            return { ...item };
          }),
        ].filter((question) => {
          if (Array.isArray(question.payload)) {
            return question.payload.length > 0;
          }
          return true;
        });
      }
      return [
        ...prev,
        {
          question_uuid: id,
          payload: [option],
        },
      ];
    });
  };

  const handleAnswer = (
    checked: boolean,
    id: string,
    data:
      | string
      | number
      | null
      | IFeedbackAnswerOption
      | IFeedbackAnswerOption[],
  ) => {
    setAnswers((prev) => {
      if (!prev || prev?.length === 0) {
        return [
          {
            question_uuid: id,
            payload: data,
          },
        ];
      }

      const findItem = prev.find((item) => item.question_uuid === id);

      if (findItem) {
        if (checked) {
          return [
            ...prev.map((item) => {
              if (item.question_uuid === id) {
                return {
                  ...item,
                  payload: data,
                };
              }
              return item;
            }),
          ];
        }
        return [...prev].filter((question) => question.question_uuid !== id);
      }

      return [
        ...prev,
        {
          question_uuid: id,
          payload: data,
        },
      ];
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      name &&
        setAnswers((prev) => {
          if (!prev || prev?.length === 0) {
            return [
              {
                question_uuid: name,
                payload: value[name].trim(),
              },
            ];
          }

          const findItem = prev.find((item) => item.question_uuid === name);

          if (findItem && value[name].trim()) {
            return [
              ...prev.map((item) => {
                if (item.question_uuid === name) {
                  return {
                    ...item,
                    payload: value[name].trim(),
                  };
                }
                return item;
              }),
            ];
          } else if (findItem && !value[name].trim()) {
            return [...prev.filter((option) => option.question_uuid !== name)];
          }

          return [
            ...prev,
            {
              question_uuid: name,
              payload: value[name].trim(),
            },
          ];
        });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setData(answers);
  }, [answers, setData]);

  return (
    <div className={css.container}>
      {questions.map((question) => (
        <Fragment key={question.uuid}>
          {question.answer_type === QuestionType.text && (
            <div className={css.text}>
              <h5 className={css.title}>
                {question.text} {question.required && <span>*</span>}
              </h5>
              <TextArea
                className={css.text_input}
                placeholder="Введите текст"
                formState={formState}
                name={question.uuid}
                validate={() => validateTextRequired(question.required)}
              />
            </div>
          )}
          {question.answer_type === QuestionType.radio && (
            <div className={css.radio}>
              <h5 className={css.title}>
                {question.text} {question.required && <span>*</span>}
              </h5>
              {question.answer_options.map((option) => (
                <Radio
                  key={option.id}
                  label={option.value}
                  check={
                    option.id ===
                    (
                      answers?.find(
                        (item) => item.question_uuid === question.uuid,
                      )?.payload as IFeedbackAnswerOption
                    )?.id
                  }
                  onClick={(check) =>
                    handleAnswer(check, question.uuid, option)
                  }
                />
              ))}
            </div>
          )}
          {question.answer_type === QuestionType.checkbox && (
            <div className={css.radio}>
              <h5 className={css.title}>
                {question.text} {question.required && <span>*</span>}
              </h5>
              {question.answer_options.map((option) => (
                <Checkbox
                  key={option.id}
                  label={option.value}
                  square
                  onClick={(checked) =>
                    handleCheckbox(checked, option, question.uuid)
                  }
                />
              ))}
            </div>
          )}
          {question.answer_type === QuestionType.rating && (
            <div className={css.radio}>
              <h5 className={css.title}>
                {question.text} {question.required && <span>*</span>}
              </h5>
              <div className={css.rating}>
                {generateArray(
                  question.rating_range_low,
                  question.rating_range_high,
                ).map((option) => (
                  <Radio
                    key={option}
                    label={`${option}`}
                    side="top"
                    check={
                      option ===
                      answers?.find(
                        (item) => item.question_uuid === question.uuid,
                      )?.payload
                    }
                    onClick={(checked) =>
                      handleAnswer(checked, question.uuid, option)
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
