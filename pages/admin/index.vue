<template>
  
  <!-- ナビゲーションバー -->
  <TheNav />

  <!-- トップバー -->
  <TheAppBar title="Home" />

  <!-- メイン -->
  <v-main>
    <v-container style="background: rgba(255, 255, 255, 0.8); min-height: 100%;" fluid>

      <!-- 統計カード -->
      <v-row>
        <v-col cols="12" sm="6" lg="4">
          <v-card class="stat">
            <v-card-title class="text-h5 font-weight-bold pa-4">クイズの数</v-card-title>
            <v-card-text class="text-h3 font-weight-bold px-8">2</v-card-text>
          </v-card>
        </v-col>

        <!-- 新規作成 -->
        <v-col cols="12" sm="6" md="4" lg="2">
          <v-dialog v-model="dialog" width="auto">
            <template v-slot:activator="{ props }">
              <v-card class="new" height="130" v-bind="props">
                <v-card-title>
                  <v-icon style="margin-left: -8px;">mdi-plus</v-icon>
                  <span>New</span>
                </v-card-title>
              </v-card>
            </template>
            
            <!-- 新規作成 : ダイアログ -->
            <v-card class="pa-2" style="border-radius: 15px; background: #fff;">

              <v-card-title class="text-h5">新規クイズ作成</v-card-title>

              <v-card-text class="pa-0">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field label="タイトル*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="問題文*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field label="問題の答え*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select :items="[1, 2, 3, 4, 5]" label="難易度*" required></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="['数学', '物理', '化学', '生物', '地学', '情報', '英語', '国語', '歴史', '地理', 'その他']"
                        label="カテゴリ*" multiple>
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-container>
                <small class="pa-3">*は必須フィールドです</small>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">Save</v-btn>
              </v-card-actions>

            </v-card>
          </v-dialog>
        </v-col>
      </v-row>

      <!-- クイズカード -->
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="2" v-for="item in 20">
          <v-card height="100">
            <v-card-title>Item {{ item }}</v-card-title>
            <v-card-text>Hello!</v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>

</template>

<script setup lang="ts">

  /* レイアウト設定 */
  definePageMeta({
    layout: 'admin'
  });

  /* ダイアログ */
  const dialog = useState('dialog', () => false);
</script>

<style lang="scss" scoped>

  // カード
  .v-card {
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.18);
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
