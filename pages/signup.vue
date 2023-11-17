<template>

  <!-- サインアップ画面 -->
  <div class="signup background-fixed">
    <v-container class="signup-inner">
          
      <!-- タイトル -->
      <v-row class="title">
        <v-col class="pa-0" style="display: flex;">
          <v-btn icon="mdi-arrow-left" variant="text" @click.stop="$pageTransition('signup-inner', '/')"></v-btn>
          <p class="title-text text-center py-2 mx-2">新規登録</p>
        </v-col>
      </v-row>
      
      <!-- サインアップフォーム -->
      <v-card class="signup-card fade-in my-3 text-white">
        <v-form ref="form" @submit.prevent="handleSubmit">

          <!-- input -->
          <v-card-text class="pa-0">
            <v-container>
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
            <v-btn class="text-body-1 mx-2 px-8" color="blue-accent-3" variant="flat" type="submit">登録</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

        </v-form>
      </v-card>
    
    </v-container>
  </div>
</template>

<script setup lang="ts">

  /* 認証必須 */
  definePageMeta({
    middleware: 'auth'
  })

  /* グローバル変数 */
  const { $pageTransition } = useNuxtApp(); // ページ遷移
  const { signup } = useUser(); // ユーザー情報
  const form = ref(); // フォーム
  const name = ref(''); // ニックネーム

  /* フォームの送信 */
  const handleSubmit = async () => {

    const validResult = await form.value.validate(); // バリデーションの結果を取得
  
    if (!validResult.valid) return; // バリデーションに失敗したら終了

    await signup(name.value); // サインアップ
    $pageTransition('signup-inner', '/login'); // ログイン画面へ遷移
  }
</script>

<style lang="scss" scoped>

  /* サインアップ */
  .signup {

    // タイトル
    .title {
      display: inline-block;
      color: $text-color-light;

      .title-text {
        width: 100px;
      
        &::after {
          content: '';
          display: block;
          height: 1px;
          border-radius: 1px;
          background: $text-color-light;
        }
      }
    }

    // カード
    .signup-card {
      backdrop-filter: blur($blur-size);
      border: 1px solid $dialog-border-color;
      background: $dialog-background-color;
      border-radius: $border-radius !important;
    }
  }
</style>
