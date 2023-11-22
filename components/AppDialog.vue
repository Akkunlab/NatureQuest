<template>
  <v-dialog v-model="dialog">
    <v-card class="dialog-card pa-2">

      <!-- 閉じるボタン -->
      <v-btn class="dialog-close ma-2" icon="mdi-close" variant="text" @click.stop="dialog = false"></v-btn>

      <!-- タイトル -->
      <v-card-title class="text-center pt-4" style="height: 56px;">{{ title }}</v-card-title>

      <!-- メニュー -->
      <transition>
        <v-card-text class="pa-4" v-if="content === 'menu'">

          <!-- ユーザー -->
          <div class="text-center">
            <v-avatar size="64" color="surface-variant" image="./images/user.webp"></v-avatar>
            <p class="text-h6 mt-2">ユーザー</p>
          </div>

          <!-- 区切り線 -->
          <v-divider class="my-2"></v-divider>

          <!-- メニュリスト -->
          <v-list class="dialog-menu">
            <v-list-item class="dialog-menu-item my-2" v-for="item in menuList" :key="item.value" rounded="xl">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title>
                <span>{{ item.text }}:</span>
                <span class="mx-2">{{ item.value }}</span>
                <span>{{ item.unit }}</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>

          </v-card-text>
      </transition>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

  /* グローバル変数 */
  const dialog = useState('dialog', () => false); // ダイアログの状態
  const title = ref('リザルト'); // ダイアログのタイトル
  const content = ref('menu'); // ダイアログのコンテンツ

  // メニューリスト
  const menuList = [
    { icon: 'mdi-shoe-sneaker', text: '歩いた距離', unit: 'm', value: 0 },
    { icon: 'mdi-clock-time-four', text: '時間', unit: 's', value: 0 }
  ];

  /* ダイアログを開く */
  const openDialog = (): void => {
    content.value = 'menu';
    dialog.value = true;
  }

  // 公開情報
  defineExpose({ openDialog, menuList });
</script>

<style lang="scss" scoped>

  /* ダイアログ */
  .dialog-card {
    min-height: 252px;
    color: $text-color-light;
    position: relative;
    backdrop-filter: blur($blur-size);
    border: 1px solid $dialog-border-color;
    background: $dialog-background-color;
    border-radius: $border-radius !important;

    // 閉じるボタン
    .dialog-close {
      inset: 0 0 auto auto; // top right bottom left
      position: absolute;
    }

    // メニュー
    .dialog-menu {
      background: transparent;

      // メニュー項目
      .dialog-menu-item {
        color: $text-color-light;
        background: $dialog-btn-background-color;
        border: 2px solid $dialog-btn-border-color;
      }
    }
  }

  /* トランジション */
  .v-enter-active, .v-leave-active {
    transition: opacity $fade-time ease;
  }
  .v-enter-from, .v-leave-to {
    opacity: 0;
  }
</style>
