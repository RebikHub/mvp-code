import { RefObject, SyntheticEvent, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { Modal } from '@/app/components/modal/Modal';
import { Checkbox } from '@/app/components/ui-kit/checkbox/Checkbox';
import { Icon } from '@/app/components/ui-kit/icon/Icon';
import { Input } from '@/app/components/ui-kit/input/Input';
import grades from '@/app/components/ui-kit/svg/grades';
import { TextArea } from '@/app/components/ui-kit/text-area/TextArea';

import { FeedbackQuestions } from './components/FeedbackQuestions';

import api from '@/app/api/api';
import { useBaseMutation } from '@/app/api/hooks/useBaseMutation';
import { useBaseQuery } from '@/app/api/hooks/useBaseQuery';
import { Answer } from '@/app/api/types';

import { useUserStore } from '@/app/store/user';

import { useFormManagement } from '@/app/services/hooks/useFormManagement';
import { useHideComponent } from '@/app/services/hooks/useHideComponent';
import { text, useText } from '@/app/services/hooks/useLocalization';
import { useScreenWidth } from '@/app/services/hooks/useScreenWidth';
import { comparisonArrays } from '@/app/services/utils/comparisonArrays';
import {
  validateDefaultRequired,
  validateEmailWithoutRequired,
  validatePhoneWithoutRequired,
  validateText,
} from '@/app/services/validators/validators';

import contactUs from '@/assets/images/contact-us.svg';
import feedbackGray from '@/assets/images/feedback-gray.svg';
import feedbackGreen from '@/assets/images/feedback-green.svg';
import modalFeedback from '@/assets/images/modal-feedback.svg';
import modalSend from '@/assets/images/modal-send.svg';
import review from '@/assets/images/review.svg';
import survey from '@/assets/images/survey.svg';

import css from './Feedback.module.scss';

export const Feedback = () => {
  const [isOpenFeedback, setIsOpenFeedback] = useState(false);
  const [isVisibleSurveyModal, setIsVisibleSurveyModal] = useState(false);
  const [isVisibleReviewModal, setIsVisibleReviewModal] = useState(false);
  const [isVisibleContactUsModal, setIsVisibleContactUsModal] = useState(false);
  const [isVisibleSendModal, setIsVisibleSendModal] = useState({
    status: false,
    type: '',
  });
  const [idIconGrade, setIdIconGrade] = useState({
    grade: 'first-grade',
    rating: 5,
  });
  const [checkedReviewModal, setCheckedReviewModal] = useState(true);
  const [questionsData, setQuestionsData] = useState<Answer[]>();
  const { isPhones } = useScreenWidth();
  const id = useUserStore.use.id();
  const name = useUserStore.use.name();
  const intl = useIntl();

  const ref = useHideComponent(setIsOpenFeedback);

  const { formState, onSubmit, reset } = useFormManagement();

  const { data: feedbacksData } = useBaseQuery(
    api.feedback.getFeedbacksUUID,
    'get/feedbacks',
  );

  const { mutate: mutateTickets, isPending: isPendingTickets } =
    useBaseMutation(api.feedback.postFeedbackTickets);

  const { mutate: mutateReviews, isPending: isPendingReviews } =
    useBaseMutation(api.feedback.postFeedbackReviews);

  const { mutate: mutateAnswers, isPending: isPendingAnswers } =
    useBaseMutation(api.feedback.postFeedbacksAnswers);

  const handleSurvey = (e?: SyntheticEvent) => {
    e?.stopPropagation();
    setIsVisibleSurveyModal(true);
  };

  const handleReview = (e?: SyntheticEvent) => {
    e?.stopPropagation();
    setIsVisibleReviewModal(true); // пока отключен
  };

  const handleContactUs = (e?: SyntheticEvent) => {
    e?.stopPropagation();
    setIsVisibleContactUsModal(true);
  };

  const handleModalReviewAction = (data: FieldValues) => {
    if (data) {
      mutateReviews(
        {
          user_id: id,
          username: data.username,
          text: data.message,
          rating: idIconGrade.rating,
        },
        {
          onSuccess: () => {
            setIsVisibleReviewModal(false);
            setIsVisibleSendModal({
              status: true,
              type: 'reviews',
            });
            reset();
            setIsOpenFeedback(false);
          },
        },
      );
    }
  };

  const handleModalContactUsAction = (data: FieldValues) => {
    if (data) {
      mutateTickets(
        {
          title: 'Отзыв',
          user_id: id,
          username: data.username,
          first_message: data.message,
          contacts: {
            phone: data.phone,
            email: data.email,
            nickname: data.nickname,
          },
        },
        {
          onSuccess: () => {
            setIsVisibleContactUsModal(false);
            setIsVisibleSendModal({
              status: true,
              type: 'tickets',
            });
            reset();
            setIsOpenFeedback(false);
          },
        },
      );
    }
  };

  const handleModalSurveyAction = () => {
    if (questionsData) {
      mutateAnswers(
        {
          user_id: id,
          username: name,
          answers: questionsData,
        },
        {
          onSuccess: () => {
            setIsVisibleSurveyModal(false);
            setIsVisibleSendModal({
              status: true,
              type: 'survey',
            });
            reset();
            setIsOpenFeedback(false);
          },
        },
      );
    }
  };

  const handleModalSendClose = () => {
    setIsVisibleSendModal({
      status: false,
      type: '',
    });
    setIsOpenFeedback(false);
  };

  const handleModalReviewClose = () => {
    reset();
    setIsVisibleReviewModal(false);
  };

  const handleModalContactUsClose = () => {
    reset();
    setIsVisibleContactUsModal(false);
  };

  const handleModalSurveyClose = () => {
    reset();
    setIsVisibleSurveyModal(false);
  };

  const handleCheckboxReviews = (checked: boolean) => {
    setCheckedReviewModal(!checked);
  };

  return (
    <>
      <div
        className={css.feedbackContainer}
        onClick={() => setIsOpenFeedback(true)}
        ref={ref as RefObject<HTMLDivElement>}
      >
        <Icon
          isRem={!isPhones}
          size={24}
          image={isOpenFeedback ? feedbackGray : feedbackGreen}
        />
        {isOpenFeedback && (
          <div className={css.feedbackOptions}>
            <div className={css.survey} onClick={handleSurvey}>
              <Icon className={css.icon} size={51} image={survey} />
              <div className={css.survey_text}>
                <FormattedMessage id="feedback.survey" />
              </div>
            </div>
            <div className={css.review} onClick={handleReview}>
              <Icon className={css.icon} size={51} image={review} />
              <div className={css.review_text}>
                <FormattedMessage id="feedback.review" />
              </div>
            </div>

            <div className={css.contactUs} onClick={handleContactUs}>
              <Icon className={css.icon} size={51} image={contactUs} />
              <div className={css.contactUs_text}>
                <FormattedMessage id="feedback.contactUs" />
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={isVisibleReviewModal}
        btnLabel={useText('modal.submit')}
        title={useText('modal.review.title')}
        onAction={onSubmit(handleModalReviewAction)}
        onClose={handleModalReviewClose}
        disabled={checkedReviewModal}
        isLoading={isPendingReviews}
      >
        <Input
          label="Email"
          placeholder="Email"
          formState={formState}
          name="username"
          validate={validateDefaultRequired}
        />
        <TextArea
          label={useText('modal.review.textarea')}
          placeholder={useText('modal.review.textarea')}
          formState={formState}
          name="message"
          validate={validateDefaultRequired}
        />
        <Checkbox
          onClick={handleCheckboxReviews}
          label={useText('modal.review.checkbox')}
        />
        <div className={css.grades}>
          <Icon
            size={47}
            svg={grades.first}
            color={idIconGrade.grade === 'first-grade' ? '#A3CB38' : '#6B6B6B'}
            fill={idIconGrade.grade === 'first-grade' ? '#A3CB38' : '#6B6B6B'}
            onClick={() => setIdIconGrade({ grade: 'first-grade', rating: 5 })}
          />
          <Icon
            size={47}
            svg={grades.second}
            color={idIconGrade.grade === 'second-grade' ? '#A3CB38' : '#6B6B6B'}
            fill={idIconGrade.grade === 'second-grade' ? '#A3CB38' : '#6B6B6B'}
            onClick={() => setIdIconGrade({ grade: 'second-grade', rating: 4 })}
          />
          <Icon
            size={47}
            svg={grades.third}
            color={idIconGrade.grade === 'third-grade' ? '#A3CB38' : '#6B6B6B'}
            fill={idIconGrade.grade === 'third-grade' ? '#A3CB38' : '#6B6B6B'}
            onClick={() => setIdIconGrade({ grade: 'third-grade', rating: 3 })}
          />
          <Icon
            size={47}
            svg={grades.fourth}
            color={idIconGrade.grade === 'fourth-grade' ? '#A3CB38' : '#6B6B6B'}
            fill={idIconGrade.grade === 'fourth-grade' ? '#A3CB38' : '#6B6B6B'}
            onClick={() => setIdIconGrade({ grade: 'fourth-grade', rating: 2 })}
          />
          <Icon
            size={47}
            svg={grades.fifth}
            color={idIconGrade.grade === 'fifth-grade' ? '#A3CB38' : '#6B6B6B'}
            fill={idIconGrade.grade === 'fifth-grade' ? '#A3CB38' : '#6B6B6B'}
            onClick={() => setIdIconGrade({ grade: 'fifth-grade', rating: 1 })}
          />
        </div>
      </Modal>

      <Modal
        iconCloseSize={20}
        title={
          feedbacksData?.title
            ? feedbacksData.title
            : text(intl, 'modal.survey.non')
        }
        onAction={onSubmit(handleModalSurveyAction)}
        isOpen={isVisibleSurveyModal}
        onClose={handleModalSurveyClose}
        isLoading={isPendingAnswers}
        btnLabel={feedbacksData ? text(intl, 'modal.submit') : undefined}
        disabled={comparisonArrays(questionsData, feedbacksData?.questions)}
      >
        {feedbacksData && (
          <FeedbackQuestions
            questions={feedbacksData.questions}
            setData={setQuestionsData}
          />
        )}
      </Modal>

      <Modal
        isOpen={isVisibleContactUsModal}
        btnLabel={useText('modal.submit')}
        title={useText('modal.contactUs.title')}
        onAction={onSubmit(handleModalContactUsAction)}
        onClose={handleModalContactUsClose}
        isLoading={isPendingTickets}
      >
        <Input
          label={useText('input.label.name')}
          placeholder={useText('input.placeholder.name')}
          formState={formState}
          name="username"
          validate={validateDefaultRequired}
        />
        <Input
          label={useText('input.phone')}
          placeholder={useText('input.phone')}
          formState={formState}
          name="phone"
          validate={validatePhoneWithoutRequired}
        />
        <Input
          label={useText('input.nickname')}
          placeholder={useText('input.nickname')}
          formState={formState}
          name="nickname"
          validate={validateText}
        />
        <Input
          label={useText('input.label.mail')}
          placeholder={useText('input.placeholder.mail')}
          formState={formState}
          name="email"
          validate={validateEmailWithoutRequired}
        />
        <TextArea
          label={useText('input.label.message')}
          placeholder={useText('input.placeholder.message')}
          formState={formState}
          name="message"
          validate={validateDefaultRequired}
        />
      </Modal>

      <Modal
        className={css.modalSend}
        isOpen={isVisibleSendModal.status}
        onClose={handleModalSendClose}
      >
        <Icon
          size={365}
          image={
            isVisibleSendModal.type === 'survey' ? modalFeedback : modalSend
          }
        />
        <FormattedMessage tagName="h2" id="modal.complete.title" />
        <p>
          <FormattedMessage
            id={`modal.complete.${isVisibleSendModal.type}.first`}
          />
          <br />
          <FormattedMessage
            id={`modal.complete.${isVisibleSendModal.type}.second`}
          />
        </p>
      </Modal>
    </>
  );
};
