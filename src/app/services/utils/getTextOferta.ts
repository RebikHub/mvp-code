export const getOfertaRecievedOrder = ({
  recipient,
  username,
  creator,
  order,
}: {
  recipient: string; // recipient_user_name
  username: string;
  creator: string; // order_user_name
  order: string;
}) => `Я ${username} вводя
следующие данные добровольно принимаю информацию размещенную в
криптозащищенном ордере ${order} на имя
${recipient} от ${creator}.
Понимаю и принимаю на себя всю ответственность в рамках
законодательства за использование полученной информации и
ценностей. Также я предупрежден о необходимости соблюдения
налогового законодательства и понимаю, что платформа Mvp
никоим образом не принимает участие в моих взаимоотношениях с
дарителем, не выступает налоговым агентом.`;

// на имя ..., созданное таким то ...

export const getOfertaCreateOrder = ({
  recipient,
  sender,
  order,
}: {
  recipient: string[];
  sender: string;
  order: string;
}) => `Я ${sender} в здравом уме, твердой памяти, при ясном сознании, действуя добровольно, сознательно, без принуждения, понимая значение собственных действий передаю ${recipient.map((recipient) => recipient).join('')} и наделяю полномочиями использовать по собственному усмотрению всю информацию, права, полномочия, пароли и другое содержимое ордера "${order}" на платформе Mvp.

Платформа Mvp не имеет доступа к передаваемой информации и не несет ответственности за ее содержание и взаимоотношения между распорядителем, получателем, третьими лицами, а также за соблюдение сторонами законодательства.`;
