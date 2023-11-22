import { LocationQueryRaw } from 'vue-router';

export default defineNuxtPlugin(() => {
  return {
    provide: {

      // ページ遷移
      pageTransition: (element: string, path: string, query?: LocationQueryRaw) => {
        const target = document.getElementsByClassName(element)[0] as HTMLElement; // ターゲットを取得

        target.classList.add('fade-out'); // フェードアウト
        setTimeout(async() => await navigateTo({ path, query }), 400); // 画面遷移
      }
    }
  }
})
