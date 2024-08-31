import { instance } from '../baseApi';
import {
  IBodyContainer,
  IBodyOpenContainer,
  IContainer,
  IOfertaInfo,
  IOpenContainer,
  IResponseItems,
} from '../types';

/*
@app.route('/containers', methods=['GET'], cors=True)
def list_containers():
    return del_containers.Containers.init_endpoint_request(app.current_request).list_containers()

@app.route('/containers', methods=['POST'], cors=True)
def create_container():
    return del_containers.Containers.init_endpoint_request(app.current_request).create_container()

@app.route('/containers/{container_id}', methods=['PUT'], cors=True)
def update_container_by_id(container_id):
    return del_containers.Containers.init_endpoint_request(app.current_request).update_container_by_id(container_id)

@app.route('/containers/{container_id}', methods=['GET'], cors=True)
def update_container_by_id(container_id):
    return del_containers.Containers.init_endpoint_request(app.current_request).get_container_by_id(container_id)

@app.route('/containers/{container_id}', methods=['DELETE'], cors=True)
def delete_container_by_id(container_id):
    return del_containers.Containers.init_endpoint_request(app.current_request).delete_container_by_id(container_id)

@app.route('/containers/open', methods=['POST'], cors=True)
def open_container():
    return del_containers.Containers.init_endpoint_request(app.current_request).open_container()

@app.route('/containers/open', methods=['GET'], cors=True)
def get_open_containers():
    return del_containers.Containers.init_endpoint_request(app.current_request).get_open_containers()

@app.route('/containers/oferta_info', methods=['POST'], cors=True)
def open_container():
    return del_containers.Containers.init_endpoint_request(app.current_request).get_info_for_oferta()
*/

const getContainers = async () => {
  return await instance.get<IResponseItems<IContainer>>('/containers');
};

const postContainers = async (body: IBodyContainer) => {
  return await instance.post('/containers', body);
};

const putContainersId = async ({
  container_id,
  body,
}: {
  container_id: string;
  body: IBodyContainer;
}) => {
  return await instance.put(`/containers/${container_id}`, body);
};

const getContainersId = async ({ container_id }: { container_id: string }) => {
  return await instance.get(`/containers/${container_id}`);
};

const deleteContainersId = async ({
  container_id,
}: {
  container_id: string;
}) => {
  return await instance.delete(`/containers/${container_id}`);
};

const postContainersOpen = async (body: IBodyOpenContainer) => {
  return await instance.post('/containers/open', body);
};

const getContainersOpen = async () => {
  return await instance.get<IOpenContainer[]>('/containers/open');
};

const postContainersOfertaInfo = async (body: IBodyOpenContainer) => {
  return await instance.post<IOfertaInfo>('/containers/oferta_info', body);
};

export default {
  getContainers,
  postContainers,
  putContainersId,
  getContainersId,
  deleteContainersId,
  postContainersOpen,
  getContainersOpen,
  postContainersOfertaInfo,
};
