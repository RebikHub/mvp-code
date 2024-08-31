import { instance } from '../baseApi';
import { IOrder, IResponseItems } from '../types';

/*
@app.route('/orders', methods=['GET'], cors=True)
def list_user_orders():
    return del_orders.Orders.init_endpoint_request(app.current_request).list_user_orders()

@app.route('/orders/inactive', methods=['GET'], cors=True)
def list_user_orders():
    return del_orders.Orders.init_endpoint_request(app.current_request).list_user_inactive_orders()

@app.route('/orders/opened', methods=['GET'], cors=True)
def list_user_orders():
    return del_orders.Orders.init_endpoint_request(app.current_request).list_user_opened_orders()

@app.route('/orders/get_all/{container_id}', methods=['GET'], cors=True)
def get_orders_by_cid(container_id):
    return del_orders.Orders.init_endpoint_request(app.current_request).get_orders_by_container_id(container_id)

@app.route('/orders/get_specific/{container_id}/{order_id}', methods=['GET'], cors=True)
def get_order_by_container_id_order_id(container_id, order_id):
    return del_orders.Orders.init_endpoint_request(app.current_request).get_order_by_container_id_order_id(container_id, order_id)

@app.route('/orders', methods=['POST'], cors=True)
def create_order():
    return del_orders.Orders.init_endpoint_request(app.current_request).create_order()

@app.route('/orders/update_specific/{order_id}', methods=['PUT'], cors=True)
def update_order_by_id(order_id):
    return del_orders.Orders.init_endpoint_request(app.current_request).update_order(order_id)

@app.route('/orders/delete_specific/{container_id}/{order_id}', methods=['DELETE'], cors=True)
def delete_order(container_id, order_id):
    return del_orders.Orders.init_endpoint_request(app.current_request).delete_order_by_container_id_order_id(
        container_id, order_id)
*/

const getOrders = async () => {
  return await instance.get<IResponseItems<IOrder>>('/orders');
};

const getOrdersInactive = async () => {
  return await instance.get<IResponseItems<IOrder>>('/orders/inactive');
};

const getOrdersOpened = async () => {
  return await instance.get<IResponseItems<IOrder>>('/orders/opened');
};

const getOrdersGetAll = async ({ container_id }: { container_id: string }) => {
  return await instance.get(`/orders/get_all/${container_id}`);
};

const getOrdersGetSpecific = async ({
  container_id,
  order_id,
}: {
  container_id: string;
  order_id: string;
}) => {
  return await instance.get(`/orders/get_specific/${container_id}/${order_id}`);
};

const postOrders = async (body: IOrder) => {
  return await instance.post('/orders', body);
};

const putOrdersUpdateSpecific = async ({
  order_id,
  body,
}: {
  order_id: string;
  body: IOrder;
}) => {
  return await instance.put(`/orders/update_specific/${order_id}`, body);
};

const deleteOrdersDeleteSpecific = async ({
  container_id,
  order_id,
}: {
  container_id: string;
  order_id: string;
}) => {
  return await instance.delete(
    `/orders/delete_specific/${container_id}/${order_id}`,
  );
};

export default {
  getOrders,
  getOrdersGetAll,
  getOrdersGetSpecific,
  postOrders,
  putOrdersUpdateSpecific,
  deleteOrdersDeleteSpecific,
  getOrdersInactive,
  getOrdersOpened,
};
