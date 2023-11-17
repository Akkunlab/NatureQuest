<template>
  
  <!-- ナビゲーションバー -->
  <TheNav />

  <!-- トップバー -->
  <TheAppBar title="Quizzes" />

  <!-- メイン -->
  <v-main>
    <v-container style="background: rgba(255, 255, 255, 0.8); min-height: 100%;" fluid>
      <v-row>

        <!-- 統計カード -->
        <v-col cols="12" sm="6" lg="4">
          <v-card class="stat">
            <v-card-title class="text-h5 font-weight-bold pa-4">クイズの数</v-card-title>
            <v-card-text class="text-h3 font-weight-bold px-8">{{ quizzes?.length }}</v-card-text>
          </v-card>
        </v-col>

        <!-- 新規作成 -->
        <v-col cols="12" sm="6" md="4" lg="2">
          <v-card class="new" height="130" @click.stop="handleCardClick($event)">
            <v-card-title>
              <v-icon style="margin-left: -8px;">mdi-plus</v-icon>
              <span>New</span>
            </v-card-title>
          </v-card>
        </v-col>

      </v-row>

      <!-- クイズカード -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="2" v-for="(item, index) in quizzes" :key="item.title">
          <v-card :index="index" class="quiz-card" height="100" @click.stop="handleCardClick($event)">
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>{{ item.text }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>

  <!-- ダイアログ -->
  <QuizDialog ref="quizDialogRef" :title="dialogTitle" :quizzes="quizzes" :index="quizIndex" />

</template>

<script setup lang="ts">
  import { Quiz } from '@/types/quiz';

  /* レイアウト設定 */
  definePageMeta({
    layout: 'admin'
  });

  /* グローバル変数 */
  const { data: quizzes } = await useFetch<Quiz[]>('/api/quizzes'); // すべてのクイズを取得
  const quizDialogRef = ref(); // クイズダイアログの参照
  const quizIndex = ref(-1); // クイズのインデックス
  const dialogTitle = ref(''); // ダイアログのタイトル

  // カードをクリックしたとき
  const handleCardClick = (event: PointerEvent): void => {
    const target = event.currentTarget as Element; // カードの種類を判定

    if (target.classList.contains('new')) { // 新規作成だったとき

      quizIndex.value = -1; // インデックスをリセット
      dialogTitle.value = 'クイズの新規作成'; // ダイアログのタイトルをセット
      quizDialogRef.value.changeState(); // クイズの情報をリセット

    } else { // クイズカードだったとき

      quizIndex.value = parseInt(target.getAttribute('index') || '-1', 10); // クイズカードのインデックスを取得

      if (quizIndex.value === -1) return; // インデックスが取得できなかったら終了
      if (quizzes.value === null) return; // クイズが存在しなかったら終了

      dialogTitle.value = 'クイズの編集'; // ダイアログのタイトルをセット
      quizDialogRef.value.changeState(quizzes.value[quizIndex.value]); // クイズの情報をセット
    }

    quizDialogRef.value.dialog = true; // ダイアログを開く
  }
</script>

<style lang="scss" scoped>

  // カード
  .v-card {
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
  }

  // 統計カード
  .stat {
    color: #fff;
    background: rgba(15, 106, 255, 0.8);
    background: linear-gradient(45deg, rgba(15, 106, 255, 0.8) 0%, rgba(88, 138, 254, 0.8) 100%);

    .v-card-text {
      line-height: 48px;
    }
  }

  // 新規作成
  .new {
    color: rgba(55, 53, 47, 0.35);
    background: none;
    box-shadow: none;
    border: 2px dashed rgba(55, 53, 47, 0.35);

    .v-card-title {
      padding: 49px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
