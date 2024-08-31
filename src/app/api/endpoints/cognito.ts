import { instance } from '../baseApi';

/*
@app.route('/login-cognito', methods=['POST'], cors=True)
def login_cognito():
    return del_auth.login_cognito(app.current_request)

@app.route('/refresh-token-cognito', methods=['POST'], cors=True)
def refresh_token_cognito():
    return del_auth.refresh_token_cognito(app.current_request)

@app.route("/signup-confirm/{client_id}/{user_name}/{confirmation_code}", methods=['GET'])
def signup_confirm(client_id, user_name, confirmation_code):
    return del_auth.signup_confirmation(client_id, user_name, confirmation_code)
*/

const postLoginCognito = async () => {
  return await instance.post('/login-cognito');
};

const postRefreshTokenCognito = async () => {
  return await instance.post('/refresh-token-cognito');
};

const getSignUpConfirm = async ({
  client_id,
  user_name,
  confirmation_code,
}: {
  client_id: string;
  user_name: string;
  confirmation_code: string;
}) => {
  return await instance.get(
    `/signup-confirm/${client_id}/${user_name}/${confirmation_code}`,
  );
};

export default {
  postLoginCognito,
  postRefreshTokenCognito,
  getSignUpConfirm,
};
