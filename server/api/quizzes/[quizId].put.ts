/* ============================================
No.4
Method: PUT
URI: /api/quizzes/{quizId}
Description: 特定のクイズを更新
============================================ */

import { db } from '../../lib/firestore';
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event); // リクエストボディを取得

    body.updatedAt = Timestamp.fromDate(new Date()); // 更新日時を追加

    // @ts-ignore
    const docRef = await updateDoc(doc(db, 'quizzes', event.context.params.quizId), body); // ドキュメントを更新

    return { result: 'success' };
  } catch (error) {
    return error;
  }
})
