export interface IResponseItems<T> {
  items: T[];
}

export interface IRecipient {
  user_id: string;
  date_create: string;
  email: string;
  date_update: string;
  phone: string;
  id: string;
  name: string;
}

export interface IOrderMessages {
  sms: string;
  email: string;
}

export interface IConditionParameter {
  days?: string;
  date?: string;
}

export interface IConditionParameters {
  [key: string]: IConditionParameter;
}

export interface IOrder {
  condition_ids: string[];
  condition_parameters: IConditionParameters;
  date_create?: string;
  container_id: string;
  container_id_old?: string;
  recipient_ids?: string[];
  user_id?: string;
  messages: IOrderMessages;
  date_update?: string;
  name: string;
  id?: string;
  conditions?: IConditionParameter;
  recipients_names?: string[];
  oferta_text?: string;
  inactive?: boolean;
  notified_recipient_ids?: string[];
}

export interface BequestData extends IOrder {
  currentStep: number;
  allowedSteps: number;
}

export interface IUser {
  avatar_image?: string;
  date_birthday?: string;
  date_last_visit?: string;
  sex?: string;
  email: string;
  phone?: string;
  id: string;
  name: string;
}

export interface IContainer {
  content: string;
  user_id: string;
  date_create: string;
  description: string;
  date_update: string;
  container_files?: string;
  name: string;
  id: string;
}

export interface IBodyRecipient {
  email: string;
  phone: string;
  name: string;
}

export interface IBodyContainer {
  name: string;
  description: string;
  content: string;
}

export interface ICondition {
  parameters: IParameters;
  description: string;
  name: string;
  id: string;
}

export interface IParameters {
  date?: string;
  days?: string;
  url?: string;
}

export interface IBodyUser {
  date_birthday: string;
  email: string;
  name: string;
  phone: string;
  sex: 'male' | 'female';
}

export interface IOpenContainer {
  content: string;
  inactive?: boolean;
  user_id: string;
  date_create: string;
  description: string;
  date_update: string;
  name: string;
  id: string;
  date_activate: string;
  container_files?: string;
}

export interface IBodyOpenContainer {
  password: string;
  recipient_email: string;
  oferta_text?: string;
}

export interface IBodyAvatar {
  file_content: File;
  user_id: string;
  img_format: string;
}

export interface IOfertaInfo {
  order_title: string;
  order_user_name: string;
  recipient_user_name: string;
}

export interface IBodyFeedbackReview {
  product_id?: string | null;
  rating?: number | null;
  text: string;
  username: string;
  user_id: string;
}

export interface IBodyFeedbackTickets {
  title: string;
  first_message: string;
  user_id: string;
  username: string;
  product_id?: string;
  contacts?: {
    email?: string;
    phone?: string;
    nickname?: string;
  };
}

export interface IFeedbacks {
  title: string;
  uuid: string;
  owner_uuid: string;
  project_uuid: string;
  questions: IFeedbackQuestion[];
}

export interface IFeedbackQuestion {
  uuid: string;
  creation_timestamp: number;
  text: string;
  answer_type: string;
  required: boolean;
  order_number: number;
  rating_range_low: number;
  rating_range_high: number;
  answer_options: IFeedbackAnswerOption[];
  owner_uuid: string;
  project_uuid: string;
  feedback_uuid: string;
}

export interface IFeedbackAnswerOption {
  id: number;
  value: string;
}

export interface Answer {
  question_uuid: string;
  payload:
    | string
    | number
    | null
    | IFeedbackAnswerOption
    | IFeedbackAnswerOption[];
}
export interface IBodyAnswers {
  user_id: string;
  username: string;
  answers: Answer[];
}
