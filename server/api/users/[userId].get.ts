/* ============================================
No.6
Method: GET
URI: /api/users/{userId}
Description: 特定のユーザの情報を取得
============================================ */

import { db } from '../../lib/firestore';
import { getDoc, doc } from 'firebase/firestore';

export default defineEventHandler(async (event) => {

  try {

    // @ts-ignore
    const snapshot = await getDoc(doc(db, 'users', event.context.params.userId)); // ユーザ内の特定のドキュメントを取得

    return snapshot.exists() ? snapshot.data() : { error: 'No such document!' }; // ドキュメントが存在するかどうか確認
  } catch (error) {
    return error;
  }
})
