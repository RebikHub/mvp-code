import { instance } from '../baseApi';
import { IBodyRecipient, IRecipient, IResponseItems } from '../types';

/*
@app.route('/recipients', methods=['GET'], cors=True)
def list_recipients():
    return del_recipients.Recipients.init_endpoint_request(app.current_request).list_recipients()


@app.route('/recipients/{recipient_id}', methods=['GET'], cors=True)
def get_recipient_by_id(recipient_id):
    return del_recipients.Recipients.init_endpoint_request(app.current_request).get_recipient_by_id(recipient_id)


@app.route('/recipients', methods=['POST'], cors=True)
def create_recipient():
    return del_recipients.Recipients.init_endpoint_request(app.current_request).create_recipient()


@app.route('/recipients/{recipient_id}', methods=['PUT'], cors=True)
def update_recipient_by_id(recipient_id):
    return del_recipients.Recipients.init_endpoint_request(app.current_request).update_recipient_by_id(recipient_id)


@app.route('/recipients/{recipient_id}', methods=['DELETE'], cors=True)
def delete_recipient_by_id(recipient_id):
    return del_recipients.Recipients.init_endpoint_request(app.current_request).delete_recipient_by_id(recipient_id)
*/

const getRecipients = async () => {
  return await instance.get<IResponseItems<IRecipient>>('/recipients');
};

const getRecipientsId = async ({ recipient_id }: { recipient_id: string }) => {
  return await instance.get(`/recipients/${recipient_id}`);
};

const postRecipients = async (body: IBodyRecipient) => {
  return await instance.post('/recipients', body);
};

const putRecipients = async ({
  recipient_id,
  body,
}: {
  recipient_id: string;
  body: IBodyRecipient;
}) => {
  return await instance.put(`/recipients/${recipient_id}`, body);
};

const deleteRecipients = async ({ recipient_id }: { recipient_id: string }) => {
  return await instance.delete(`/recipients/${recipient_id}`);
};

export default {
  getRecipients,
  getRecipientsId,
  postRecipients,
  putRecipients,
  deleteRecipients,
};
