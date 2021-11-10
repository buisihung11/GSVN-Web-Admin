import { notification } from 'antd';
import axios from 'axios';
import { setSession } from './jwt';
import { setUserInfo } from './utils';

// ----------------------------------------------------------------------

const parseParams = (params: any) => {
  const keys = Object.keys(params);
  let options = '';

  keys.forEach((key) => {
    const isParamTypeObject = typeof params[key] === 'object';
    const isParamTypeArray =
      isParamTypeObject && Array.isArray(params[key]) && params[key].length >= 0;

    if (!isParamTypeObject) {
      options += `${key}=${params[key]}&`;
    }

    if (isParamTypeObject && isParamTypeArray) {
      params[key].forEach((element: any) => {
        options += `${key}=${element}&`;
      });
    }
  });

  return options ? options.slice(0, -1) : options;
};

const request = axios.create({
  baseURL: 'https://internal.tutorup.edu.vn/api/admin',
  paramsSerializer: parseParams,
});

request.interceptors.request.use((options) => {
  const { method } = options;

  if (method === 'put' || method === 'post') {
    Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8',
    });
  }

  return options;
});

const codeMessage = {
  200: 'Thực hiện thành công.',
  201: 'Tạo thành công',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: 'There was an error in the requested request, and the server did not create or modify data.',
  401: 'The user does not have permission (token, user name, wrong password).',
  403: 'The user is authorized, but access is prohibited.',
  404: 'Resource Empty',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: 'Có lỗi xảy ra. Vui lòng thử lại',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

request.interceptors.response.use(
  (response) => {
    const {
      status,
      config: { method },
    } = response;
    console.log(`status`, status, response);
    switch (status) {
      case 200:
        if (method !== 'get')
          notification.success({
            message: 'Thành công',
            description: codeMessage[200],
          });
        break;
      case 201:
        if (method !== 'GET')
          notification.success({
            message: 'Thành công',
            description: codeMessage[201],
          });
        break;
      case 401:
        notification.error({
          message: 'Unauthorization',
          description: 'Not Logged in. Please Loggin',
        });
        /* eslint-disable no-underscore-dangle */
        setSession(null);
        setUserInfo(null);
        // eslint-disable-next-line no-restricted-globals
        location.href = '/user/login';
        // setTimeout(() => {
        //   window.g_app._store.dispatch({
        //     type: 'login/logout',
        //   });
        // }, 3000);
        break;
      case 403:
        notification.error({
          message: response.statusText,
          description: `Your request to ${response.config.url} was forbiden`,
        });
        break;
      case 405:
        notification.error({
          message: response.statusText,
          description: `${response.data.body?.message}`,
        });
        break;
      case 500:
        notification.error({
          message: 'Có lỗi xảy ra',
          description: `Vui lòng liên hệ kỹ thuật viên để kiểm tra`,
        });
        break;
      default:
        break;
    }

    return response;
  },
  (error) => {
    const msg = (error.response && error.response.data?.error?.message) || 'Có lỗi xảy ra';
    notification.error({
      message: 'Có lỗi xảy ra',
      description: msg,
    });
    Promise.reject(msg);
  },
);

export default request;
