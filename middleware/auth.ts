/* ログイン認証 */
export default defineNuxtRouteMiddleware((to, from) => {

  const loginId = useCookie('loginId'); // login Idを管理するCookie
  const isLoggedIn = useCookie('isLoggedIn'); // ログイン状態を管理するCookie

  // ログイン済み
  if (Boolean(isLoggedIn.value) && to.path !== '/home') return navigateTo('/home');

  // サインアップ処理
  if (!loginId.value && !Boolean(isLoggedIn.value) && to.path !== '/signup') return navigateTo('/signup');

  // ログイン処理
  if (loginId.value && !Boolean(isLoggedIn.value) && to.path !== '/login') return navigateTo('/login');
})
