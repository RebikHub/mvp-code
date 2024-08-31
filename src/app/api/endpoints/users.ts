import { instance } from '../baseApi';
import { IBodyAvatar, IBodyUser, IUser } from '../types';

/*
@app.route('/users', methods=['POST'], cors=True)
def create_user():
    return del_users.Users.init_endpoint_request(app.current_request).create_user()


@app.route('/users/{user_id}', methods=['PUT'], cors=True)
def update_user_by_id(user_id):
    return del_users.Users.init_endpoint_request(app.current_request).update_user_by_id(user_id)


@app.route('/users/date_last_visit/{user_id}', methods=['PUT'], cors=True)
def update_date_last_visit(user_id):
    return del_users.Users.init_endpoint_request(app.current_request).update_date_last_visit(user_id)


@app.route('/users/avatars', methods=['POST'], content_types=['multipart/form-data'], cors=True)
def add_user_avatar():
    return del_users.Users.init_image_request(app.current_request).add_user_avatar()


@app.route('/users', methods=['GET'], cors=True)
def list_users():
    return del_users.Users.init_endpoint_request(app.current_request).list_users()


@app.route('/users/{user_id}', methods=['GET'], cors=True)
def get_user_by_id(user_id):
    return del_users.Users.init_endpoint_request(app.current_request).get_user_by_id(user_id)
*/

const postUsers = async () => {
  return await instance.post('/users');
};

const putUsers = async ({
  user_id,
  body,
}: {
  user_id: string;
  body: IBodyUser;
}) => {
  return await instance.put(`/users/${user_id}`, body);
};

const putUsersDateLastVisit = async ({ user_id }: { user_id: string }) => {
  return await instance.put(`/users/date_last_visit/${user_id}`);
};

const postUsersAvatars = async (body: IBodyAvatar) => {
  const data = new FormData();

  data.append('file_content', body.file_content);
  data.append('user_id', body.user_id);
  data.append('img_format', body.img_format);

  return await instance.post('/users/avatars', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const getUsers = async () => {
  return await instance.get('/users');
};

const getUser = async ({ user_id }: { user_id: string }) => {
  return await instance.get<IUser>(`/users/${user_id}`);
};

export default {
  postUsers,
  putUsers,
  putUsersDateLastVisit,
  postUsersAvatars,
  getUsers,
  getUser,
};
