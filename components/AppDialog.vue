<template>
  <v-dialog v-model="dialog">
    <v-card class="dialog-card pa-2">
      
      <!-- 戻るボタン -->
      <v-btn class="dialog-back ml-2 mt-4" icon="mdi-arrow-left" variant="text" @click.stop="handleBtnClick('menu')" v-if="content && content !== 'menu'"></v-btn>

      <!-- 閉じるボタン -->
      <v-btn class="dialog-close ma-2" icon="mdi-close" variant="text" @click.stop="dialog = false"></v-btn>

      <!-- タイトル -->
      <v-card-title class="text-center pt-4" style="height: 56px;">{{ title }}</v-card-title>

      <!-- メニュー -->
      <transition>
        <v-card-text class="pa-4" v-if="content === 'menu'">

          <!-- ユーザー -->
          <div class="text-center">
            <v-avatar size="64" color="surface-variant"></v-avatar>
            <p class="text-h6 mt-2">{{ user.name }}</p>
          </div>

          <!-- 区切り線 -->
          <v-divider class="my-2"></v-divider>

          <!-- メニュリスト -->
          <v-list class="dialog-menu">
            <v-list-item class="dialog-menu-item my-2" v-for="item in menuList" :key="item.value" rounded="xl" @click.stop="handleBtnClick(item.value)">
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>

          </v-card-text>
      </transition>
        
      <!-- メニュー: プロフィール -->
      <transition>
        <v-card-text class="pa-4" v-if="content === 'profile'">
          <v-form ref="form" @submit.prevent="handleSubmit">
            
            <!-- input -->
            <v-card-text class="pa-0">
              <v-container class="pa-0">
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="name" label="ニックネーム" :rules="[$requiredValidation]" required></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          
            <!-- ボタン -->
            <v-card-actions class="py-4">
              <v-spacer></v-spacer>
              <v-btn class="text-body-1 mx-2 px-8" color="blue-accent-3" variant="flat" type="submit">更新</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          
          </v-form>
        </v-card-text>
      </transition>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

  /* グローバル変数 */
  const { user } = useUser(); // ユーザー情報
  const dialog = useState('dialog', () => false); // ダイアログの状態
  const title = ref('メニュー'); // ダイアログのタイトル
  const content = ref('menu'); // ダイアログのコンテンツ
  const form = ref(); // フォーム
  const name = ref(user.value.name); // ニックネーム

  // メニューリスト
  const menuList = [
    { icon: 'mdi-account', text: 'プロフィール', value: 'profile' },
    { icon: 'mdi-cog', text: '設定', value: 'setting' }
  ];

  /* ダイアログを開く */
  const openDialog = (): void => {
    content.value = 'menu';
    dialog.value = true;
  }

  /* ボタンをクリックしたとき */
  const handleBtnClick = (value: string): void => {
    content.value = ''; // ダイアログのコンテンツを初期化
    title.value = ''; // ダイアログのタイトルを初期化

    // ダイアログを更新
    setTimeout(() => {
      content.value = value;
      title.value = menuList.find(item => item.value === value)?.text || 'メニュー';
    }, 550);
  }

  /* フォームの送信 */
  const handleSubmit = async () => {

    const validResult = await form.value.validate(); // バリデーションの結果を取得
  
    if (!validResult.valid) return; // バリデーションに失敗したら終了
  }

  // 公開情報
  defineExpose({ openDialog });
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

    // 戻るボタン
    .dialog-back {
      inset: 0 auto auto 0; // top right bottom left
      position: absolute;
    }

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
