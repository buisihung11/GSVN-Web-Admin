import { AuthUser } from './@types/authentication';
import { getUserInfo } from './utils/utils';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access() {
  // const { currentUser } = initialState || {};
  // get current user from session
  const currentUser = JSON.parse(getUserInfo()!) as AuthUser;
  return {
    canAdmin: () => currentUser && currentUser?.role === 'Administrator',
    canModerator: () => currentUser && currentUser?.role === 'Moderator',
    hasAuthen: () => currentUser && currentUser?.role,
  };
}
