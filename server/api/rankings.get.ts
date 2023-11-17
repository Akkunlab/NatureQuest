/* ============================================
No.11
Method: GET
URI: /api/rankings
Description: ユーザーのランキングを取得
============================================ */

import { db } from '../lib/firestore';
import { getDoc, doc } from 'firebase/firestore';

export default defineEventHandler(async () => {

  try {

    const snapshot = await getDoc(doc(db, 'rankings', 'all')); // ユーザーのランキングドキュメントを取得

    return snapshot.exists() ? snapshot.data() : { error: 'No such document!' }; // ドキュメントが存在するかどうか確認
  } catch (error) {
    return error;
  }
})
