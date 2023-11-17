<template>

  <!-- ランキング画面 -->
  <div class="ranking background-fixed">
    <v-container class="ranking-inner">
          
      <!-- タイトル -->
      <v-row class="title">
        <v-col class="pa-0" style="display: flex;">
          <v-btn icon="mdi-arrow-left" variant="text" @click.stop="$pageTransition('ranking-inner', '/home', { ss: 'false' })"></v-btn>
          <p class="title-text text-center py-2 mx-2">ランキング</p>
        </v-col>
      </v-row>
      
      <!-- ランキングリスト -->
      <v-card class="ranking-card fade-in my-3">
        <v-card-text>
          <v-list class="ranking-list pa-0" v-if="isRankingLoaded">
            <v-list-item class="ranking-item my-2" v-for="item in rankingList" height="50" rounded="xl">
              <v-container class="pa-0" style="display: flex; align-items: center;">
                <p class="text-body-1" style="width: 30px;">{{ item.rank }}</p>
                <v-avatar size="32" color="surface-variant" class="mx-2"></v-avatar>
                <v-list-item-title class="text-body-1">{{ item.name }}</v-list-item-title>
                <p style="margin-left: auto; white-space: nowrap">{{ item.point }} pt</p>
              </v-container>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    
    </v-container>
  </div>
</template>

<script setup lang="ts">

  /* データの型 */
  interface Data {
    value: {
      data: rankingData[];
    };
  }

  /* ランキングデータの型 */
  interface rankingData {
    name: string;
    point: number;
    rank?: number | null;
  }

  /* グローバル変数 */
  const { $pageTransition } = useNuxtApp(); // ページ遷移
  const isRankingLoaded = ref(true); // ランキングリストが読み込まれたか（最初のtrueは初期化）
  let rankingList: rankingData[] = []; // ランキングリスト

  /* ランキングリストを初期化 */
  for (let i = 0; i < 10; i++) rankingList.push({ name: '', point: 0, rank: null });

  /* 高さを取得 */
  const setHeight = (): void => {
    let height = window.innerHeight - 82; // 82pxはタイトル、余白を合わせた高さ
    document.documentElement.style.setProperty('--vh', `${height}px`); // 高さを設定
  }

  /* ランキングリストを取得 */
  const getRankingList = async (): Promise<rankingData[]> => {
    let currentRank: number = 1; // 現在の順位
    let previousScore: number | null = null; // 前のスコア
    const { data }: { data: Data } = await useFetch('/api/rankings'); // ユーザーのランキングを取得

    // ループで順位を設定
    data.value.data.forEach((user, index) => {
      currentRank = user.point !== previousScore ? index + 1 : currentRank; // スコアが前のスコアと同じ場合は順位を変更しない
      data.value.data[index].rank = currentRank; // 順位を設定
      previousScore = user.point; // 前のスコアを更新
    });

    return data.value.data;
  }

  setTimeout(async () => {
    rankingList = await getRankingList();
    isRankingLoaded.value = false;
    isRankingLoaded.value = true;
  }, 10);

  setHeight(); // 初期化
  window.addEventListener('resize', setHeight); // リサイズ時に高さを設定
  window.addEventListener('orientationchange', setHeight); // 画面回転時に高さを設定
</script>

<style lang="scss" scoped>

  /* ランキング */
  .ranking {

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
    .ranking-card {
      height: var(--vh);
      backdrop-filter: blur($blur-size);
      border: 1px solid $dialog-border-color;
      background: $dialog-background-color;
      border-radius: $border-radius !important;
      overflow-y: scroll;

      // ランキング
      .ranking-list {
        background: transparent;

        // ランキング項目
        .ranking-item {
          color: $text-color-light;
          background: $dialog-btn-background-color;
          box-shadow: 0 3px 3px $shadow-color;
        }
      }
    }
  }
</style>
