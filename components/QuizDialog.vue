<template>

  <!-- クイズ詳細ダイアログ -->
  <v-dialog v-model="dialog" width="auto">
    <v-card class="pa-2" style="border-radius: 15px; background: #fff;">
      <v-form ref="form" @submit.prevent="handleSubmit">

        <!-- タイトル -->
        <v-card-title class="pt-4 text-h5" style="display: flex; align-items: center;">
          <span>{{ title }}</span>
          <v-btn
            v-if="index !== -1"
            class="mx-2"
            icon="mdi-delete"
            color="grey-darken-1"
            variant="text"
            @click.stop="deleteQuiz()"
          >
          </v-btn>
        </v-card-title>

        <!-- input -->
        <v-card-text class="pa-0">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="state.title" label="タイトル*" :rules="[$requiredValidation]" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="state.text" label="問題文*" :rules="[$requiredValidation]" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="state.answer" label="問題の答え*" :rules="[$requiredValidation]" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="state.difficulty"
                  label="難易度*"
                  :items="[1, 2, 3, 4, 5]"
                  :rules="[$requiredValidation]"
                  required>
                </v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  v-model="state.category"
                  label="カテゴリ*"
                  :items="['数学', '物理', '化学', '生物', '地学', '情報', '英語', '国語', '歴史', '地理', 'その他']"
                  :rules="[$requiredValidation]"
                  multiple
                  required>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <p class="pa-3">*は必須フィールドです</p>
        </v-card-text>

        <!-- ボタン -->
        <v-card-actions class="py-4">
          <v-spacer></v-spacer>
          <v-btn class="text-body-1 mx-2" variant="text" @click.stop="dialog = false">キャンセル</v-btn>
          <v-btn class="text-body-1 mx-2 px-8" color="blue-accent-3" variant="flat" type="submit">保存</v-btn>
        </v-card-actions>

      </v-form>
    </v-card>
  </v-dialog>

  <!-- 削除確認ダイアログ -->
  <v-dialog v-model="deleteDialog" width="auto">
    <v-card class="pa-2" style="border-radius: 15px; background: #fff;">
      <v-card-text class="px-4">本当にクイズを削除しますか？</v-card-text>
      <v-card-actions class="py-4">
        <v-spacer></v-spacer>
        <v-btn class="text-body-1 mx-2" variant="text" @click.stop="deleteDialog = false">キャンセル</v-btn>
        <v-btn class="text-body-1 mx-2 px-8" color="red-darken-1" variant="flat" @click.stop="deleteQuiz('delete')">削除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup lang="ts">
  import { Quiz } from '@/types/quiz';

  /* Propsの型 */
  interface Props {
    title: string;
    quizzes: Quiz[] | null;
    index: number;
  }

  /* グローバル変数 */
  const props = defineProps<Props>(); // propsの初期化
  const dialog = useState('dialog', () => false); // ダイアログの状態
  const deleteDialog = useState('deleteDialog', () => false); // 削除ダイアログの状態
  const form = ref(); // フォームの参照

  // フォームの状態
  const state = reactive<Quiz>({
    title: '',
    text: '',
    answer: '',
    difficulty: 1,
    category: []
  });

  // フォームの送信
  const handleSubmit = async () => {
    
    const validResult = await form.value.validate(); // バリデーションの結果を取得
    let url: string; // URLの初期化
    let method: "GET" | "POST" | "PUT" | "DELETE"; // メソッドの初期化

    if (!validResult.valid) return; // バリデーションに失敗したら終了
    if (props.quizzes === null) return; // クイズが存在しなかったら終了

    if (props.index === -1) { // 新規作成
      url = '/api/quizzes/';
      method = 'POST';
      props.quizzes.push(JSON.parse(JSON.stringify(state))); // クイズを表示エリアに追加
    } else { // 編集
      const id = props.quizzes[props.index].id; // クイズのIDを取得
      
      url = `/api/quizzes/${id}`;
      method = 'PUT';
      props.quizzes[props.index] = { ...state, id }; // 表示エリアのクイズを更新
    }

    const { data } = await useFetch(url, { method, body: JSON.stringify(state) }); // クイズを作成または更新

    console.log(data.value); // ログ出力
    dialog.value = false; // ダイアログを閉じる
  }

  // クイズの削除
  const deleteQuiz = async (value?: string) => {

    if (props.quizzes === null) return; // クイズが存在しなかったら終了

    // 削除ダイアログの値がないとき
    if (!value) {
      deleteDialog.value = true; // 削除ダイアログを表示
      return;
    }

    // 削除
    const id = props.quizzes[props.index].id; // クイズのIDを取得
    const { data } = await useFetch(`/api/quizzes/${id}`, { method: 'DELETE' }); // クイズを削除

    props.quizzes.splice(props.index, 1); // クイズを表示エリアから削除
    console.log(data.value); // ログ出力
    dialog.value = false; // ダイアログを閉じる
    deleteDialog.value = false; // 削除ダイアログを閉じる
  }

  // フォームの状態を変更
  const changeState = (value?: Quiz): void => {

    if (value) {
      state.title = value.title; // タイトルをリセット
      state.text = value.text; // 問題文をリセット
      state.answer = value.answer; // 答えをリセット
      state.difficulty = value.difficulty; // 難易度をリセット
      state.category = value.category; // カテゴリをリセット
    } else {
      state.title = ''; // タイトルをセット
      state.text = ''; // 問題文をセット
      state.answer = ''; // 答えをセット
      state.difficulty = 1; // 難易度をセット
      state.category = []; // カテゴリをセット
    }
  }

  // 公開情報
  defineExpose({
    dialog,
    changeState
  });
</script>
