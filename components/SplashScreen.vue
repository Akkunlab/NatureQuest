<template>
  <v-sheet class="splash-screen" @click="handleScreenClick($event)">
    <v-container class="splash-screen-inner">

      <!-- メイン -->
      <v-main class="main">

        <!-- 画像 -->
        <v-row class="image">
          <v-col>
            <img class="splash-screen-img" src="/images/splash_screen.png" alt="Logo Image">
          </v-col>
        </v-row>

        <!-- タイトル -->
        <v-row class="title text-h6">
          <v-col>
            <p class="title-text">AY</p>
          </v-col>
        </v-row>

        <!-- スタート -->
        <v-row class="tap-to-start">
          <v-col>
            <p class="tap-to-start-text font-weight-bold">TAP TO START</p>
          </v-col>
        </v-row>

      </v-main>

      <!-- 著作権表示 -->
      <v-row class="copyright">
        <v-col>
          <small class="copyright-text">&copy; 2023 Atsushi & Yushi</small>
        </v-col>
      </v-row>

    </v-container>
  </v-sheet>
</template>

<script setup lang="ts">

  const props = defineProps({
    init: Function,
  });

  /* スプラッシュ画面をクリックしたとき */
  const handleScreenClick = (event: PointerEvent): void => {
    const target = event.currentTarget as HTMLElement; // クリックした要素を取得
    target.classList.add('fade-out'); // フェードアウトさせる
    setTimeout(() => target.remove(), 1000); // 1秒後にスプラッシュ画面を削除

    // start.mp3を再生
    const audio = new Audio('./audio/start_iu_1.mp3');
    audio.play();
    props.init?.();
  }
</script>

<style lang="scss" scoped>

  /* スプラッシュ画面 */
  .splash-screen {
    width: 100%;
    height: 100%;
    inset: 0 auto auto 0; // top right bottom left
    cursor: pointer; // カーソルをポインターにする
    position: fixed;
    z-index: 10000;

    // フェードアウト
    &.fade-out {
      animation: fadeOut $fade-time ease forwards;
    }

    .splash-screen-inner {
      height: 100%;
      position: relative;
      text-align: center;
      color: $text-color;
      background: $background-color;

      // テキストの影
      .title-text, .copyright-text {
        text-shadow: 0 0 3px $background-color,
                     0 0 3px $background-color,
                     0 0 3px $background-color,
                     0 0 3px $background-color,
                     0 0 3px $background-color;
      }

      // メイン
      .main {
        width: 100%;
        padding: 12px 0;
        inset: 50% auto auto 50%; // top right bottom left
        position: absolute;
        transform: translate(-50%, -50%);

        // 画像
        .image {
          z-index: 2;

          .splash-screen-img {
            width: 100%;
            opacity: 0;
            pointer-events: none; // 画像をクリックできないようにする
            animation: moveDown 6s ease forwards,
                       moveRight 6s 5.5s ease forwards,
                       moveLeft 6s 11s ease forwards,
                       moveScale 6s 16.5s ease forwards;
          }
        }
        
        // タイトル
        .title {
          position: relative;
          z-index: 1;
        }

        // スタート
        .tap-to-start {
          .tap-to-start-text {
            letter-spacing: 0.5em;
            color: $text-color-light;
            position: relative;
            display: inline-block;
            text-shadow: 0px 0px 3px $shadow-color;
            animation: blink 3.3s infinite; // 点滅

            &::after {
              content: '';
              inset: 0; // top right bottom left
              position: absolute;
              background: linear-gradient(to right, $primary-color, $secondary-color);
              opacity: 0.8;
              filter: blur(20px);
              transform: scaleX(1.2) scaleY(0.8);
              z-index: -1;
            }
          }
        }
      }

      // 著作権表示
      .copyright {
        inset: auto 0 0 0; // top right bottom left
        margin: auto;
        position: absolute;
      }
    }
  }
</style>
