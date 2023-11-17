/* ============================================
No.1
Method: GET
URI: /api/quizzes
Description: すべてのクイズを取得
============================================ */

import { db } from '../../lib/firestore';
import { collection, getDocs, query } from 'firebase/firestore';

export default defineEventHandler(async () => {

  try {
    const snapshot = await getDocs(query(collection(db, 'quizzes'))); // クイズのコレクションを取得
    const docs = Array.from(snapshot.docs).map((doc) => {
      return {
        ...doc.data(),
        id: doc.id
      };
    });

    return docs;
  } catch (error) {
    return error;
  }
})
