/* ============================================
No.5
Method: DELETE
URI: /api/quizzes/{quizId}
Description: 特定のクイズを削除
============================================ */

import { db } from '../../lib/firestore';
import { doc, deleteDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {

  try {

    // @ts-ignore
    await deleteDoc(doc(db, 'quizzes', event.context.params.quizId)); // ドキュメントを削除

    return { result: 'success' };
  } catch (error) {
    return error;
  }
})
