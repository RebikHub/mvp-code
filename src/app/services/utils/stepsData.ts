import { MainPath, OrderPath, RootPath } from '@/app/router/enum/enum';

import confirm from '@/assets/images/finger-step-confirm.svg';
import fifth from '@/assets/images/finger-step-fifth.svg';
import first from '@/assets/images/finger-step-first.svg';
import fourth from '@/assets/images/finger-step-fourth.svg';
import second from '@/assets/images/finger-step-second.svg';
import third from '@/assets/images/finger-step-third.svg';

export const stepsData = (isCreateOrder: boolean) => {
  const rootPath = `/${RootPath.main}/${isCreateOrder ? MainPath.orderCreate : MainPath.orderEdit}`;
  const mainPath = `/${RootPath.main}`;
  const firstStepPath = `${rootPath}/${OrderPath.title}`;
  const secondStepPath = `${rootPath}/${OrderPath.recipients}`;
  const thirdStepPath = `${rootPath}/${OrderPath.notification}`;
  const fourthStepPath = `${rootPath}/${OrderPath.containers}`;
  const fifthStepPath = `${rootPath}/${OrderPath.condition}`;
  const confirmStepPath = `${rootPath}/${OrderPath.confirm}`;

  return [
    {
      step: 1,
      image: first,
      info: 'step.info.first',
      curUrl: firstStepPath,
      prevUrl: mainPath,
      nextUrl: secondStepPath,
      title: 'step.title.first',
    },
    {
      step: 2,
      image: second,
      info: 'step.info.second',
      curUrl: secondStepPath,
      prevUrl: firstStepPath,
      nextUrl: thirdStepPath,
      title: 'step.title.second',
    },
    {
      step: 3,
      image: third,
      info: 'step.info.third',
      curUrl: thirdStepPath,
      prevUrl: secondStepPath,
      nextUrl: fourthStepPath,
      title: 'step.title.third',
    },
    {
      step: 4,
      image: fourth,
      info: 'step.info.fourth',
      curUrl: fourthStepPath,
      prevUrl: thirdStepPath,
      nextUrl: fifthStepPath,
      title: 'step.title.fourth',
    },
    {
      step: 5,
      image: fifth,
      info: 'step.info.fifth',
      curUrl: fifthStepPath,
      prevUrl: fourthStepPath,
      nextUrl: confirmStepPath,
      title: 'step.title.fifth',
    },
    {
      step: 5,
      image: confirm,
      info: '',
      curUrl: confirmStepPath,
      prevUrl: fifthStepPath,
      nextUrl: confirmStepPath,
      title: 'step.title.sixth',
    },
  ];
};
