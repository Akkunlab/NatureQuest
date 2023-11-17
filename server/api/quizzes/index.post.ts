/* ============================================
No.3
Method: POST
URI: /api/quizzes
Description: 新しいクイズを作成
============================================ */

import { db } from '../../lib/firestore';
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event); // リクエストボディを取得

    body.createdAt = Timestamp.fromDate(new Date()); // 作成日時を追加
    body.updatedAt = Timestamp.fromDate(new Date()); // 更新日時を追加

    const docRef = await addDoc(collection(db, 'quizzes'), body); // クイズのコレクションにドキュメントを追加

    return { result: 'success' };
  } catch (error) {
    return error;
  }
})
