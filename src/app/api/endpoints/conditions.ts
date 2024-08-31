import { instance } from '../baseApi';

/*
@app.route('/conditions', methods=['GET'], cors=True)
def list_conditions():
    return del_conditions.Conditions.init_endpoint_request(app.current_request).list_conditions()

@app.route('/conditions/{condition_id}', methods=['GET'], cors=True)
def get_condition_by_id(condition_id):
    return del_conditions.Conditions.init_endpoint_request(app.current_request).get_condition_by_id(condition_id)
*/

const getConditions = async () => {
  return await instance.get('/conditions');
};

const getConditionsId = async ({ condition_id }: { condition_id: string }) => {
  return await instance.get(`/conditions/${condition_id}`);
};

export default {
  getConditions,
  getConditionsId,
};
