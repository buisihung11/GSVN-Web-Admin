import { AuthUser } from './@types/authentication';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: AuthUser | undefined }) {
  const { currentUser } = initialState || {};
  // get current user from session
  console.log(`currentUser`, currentUser);
  return {
    canAdmin: () => currentUser && currentUser?.role === 'Administrator',
    canModerator: currentUser && currentUser?.role === 'moderator',
  };
}
