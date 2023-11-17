/* ============================================
No.2
Method: GET
URI: /api/quizzes/{quizId}
Description: 特定のクイズを取得
============================================ */

import { db } from '../../lib/firestore';
import { getDoc, doc } from 'firebase/firestore';

export default defineEventHandler(async (event) => {

  try {

    // @ts-ignore
    const snapshot = await getDoc(doc(db, 'quizzes', event.context.params.quizId)); // クイズ内の特定のドキュメントを取得

    return snapshot.exists() ? snapshot.data() : { error: 'No such document!' }; // ドキュメントが存在するかどうか確認
  } catch (error) {
    return error;
  }
})
