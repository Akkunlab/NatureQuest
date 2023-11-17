<template>

  <!-- スプラッシュ画面 -->
  <SplashScreen v-if="$route.query.ss !== 'false'"/>

  <!-- ホーム画面 -->
  <div class="home background-fixed">
    <v-container class="home-inner fade-in">

      <!-- タイトル -->
      <v-row class="title">
        <v-col>
          <p class="title-text py-3 mx-2">ホーム</p>
        </v-col>
      </v-row>

      <!-- ステータス -->
      <v-row class="status mx-2 mt-3">
        <v-col class="px-0">
          <p class="status-text pl-8 pr-3">
            <span class="pr-2">ポイント:</span>
            <span>{{ user.point }}</span>
          </p>
        </v-col>
      </v-row>

      <!-- 背景 -->
      <v-row class="background">
        <v-sheet class="background-inner"></v-sheet>
      </v-row>

      <!-- ホームアクション -->
      <v-row class="home-action my-5 mx-0">
        <v-col cols="4" v-for="btn in btnList" :key="btn.name">
          <v-btn :id="btn.id" class="home-action-btn" @click.stop="handleBtnClick($event)">
            <div class="home-action-btn-inner">
              <v-icon class="home-action-btn-icon" size="32">{{ btn.icon }}</v-icon>
              <p>{{ btn.name }}</p>
            </div>
          </v-btn>
        </v-col>
      </v-row>

    </v-container>
  </div>

  <!-- ダイアログ -->
  <AppDialog ref="appDialogRef" />

</template>

<script setup lang="ts">

  /* 認証必須 */
  definePageMeta({
    middleware: 'auth'
  })

  /* グローバル変数 */
  const { user } = useUser(); // ユーザー情報
  const { $pageTransition } = useNuxtApp(); // ページ遷移
  const appDialogRef = ref(); // ダイアログ

  // ホームボタンリスト
  const btnList = [
    { id: 'ranking', icon: 'mdi-crown', name: 'ランキング' },
    { id: 'quest', icon: 'mdi-sword-cross', name: 'クエスト' },
    { id: 'menu', icon: 'mdi-menu', name: 'メニュー' }
  ];

  /* ボタンをクリックしたとき */
  const handleBtnClick = (event: PointerEvent): void => {
    const target = event.currentTarget as Element; // カードの種類を判定

    // ボタンの種類によって処理を分岐
    switch (target.id) {
      case 'ranking': $pageTransition('home-inner', '/ranking'); break; // ランキング画面へ遷移
      case 'quest': break;
      case 'menu': appDialogRef.value.openDialog(); break; // ダイアログを開く
    }
  }
</script>

<style lang="scss" scoped>

  /* ホーム画面 */
  .home {
    text-align: center;

    // タイトル
    .title {
      inset: 0 auto auto 0; // top right bottom left
      position: absolute;
      color: $text-color-light;

      .title-text {
        width: 82px;
      
        &::after {
          content: '';
          display: block;
          height: 1px;
          border-radius: 1px;
          background: $text-color-light;
        }
      }
    }

    // ステータス
    .status {
      inset: 0 0 auto auto; // top right bottom left
      position: absolute;
      color: $text-color-light;

      .status-text {
        border-radius: $border-radius;
        backdrop-filter: blur($blur-size);
        background: $home-status-background-color;
      }
    }

    // 背景
    .background {
      inset: 0;
      margin: 0;
      position: absolute;
      z-index: -1;

      .background-inner {
        width: 100%;
        height: 100%;
        box-shadow: 0px 0px 200px 10px $home-background-color inset;
        background: transparent;
      }
    }
    
    // ホームアクション
    .home-action {
      inset: auto 0 0 0; // top right bottom left
      position: absolute;

      // ホームアクションボタン
      .home-action-btn {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        backdrop-filter: blur($blur-size);
        color: $text-color-light;
        position: relative;
        font-size: 0.7em;
        border: 1px solid $home-btn-border-color;
        background: $home-btn-background-color;
        box-shadow: 0px 0px 10px 1px $home-btn-shadow-color inset;
        text-shadow: 0 0 3px $primary-color,
                     0 0 3px $primary-color,
                     0 0 3px $primary-color,
                     0 0 3px $primary-color,
                     0 0 3px $primary-color;

        .home-action-btn-icon {
          margin-top: -5px;
        }
      }

      // 2番目のボタン
      div:nth-child(2) {

        .home-action-btn {
          transform: scale(1.3);
          margin-top: -11px;
        }
      }
    }
  }
</style>
