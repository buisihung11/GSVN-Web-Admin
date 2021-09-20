import { TAppSetting } from '@/type/appsetting';
import request from '@/utils/axios';

export const updateAppSetting = (values: TAppSetting) => request.put('/app-setting', values);

const appSettingApi = {
  updateAppSetting,
};

export default appSettingApi;
