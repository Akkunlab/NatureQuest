/* ============================================
No.8
Method: PUT
URI: /api/users/{userId}
Description: 特定のユーザの情報を更新
============================================ */

import { db } from '../../lib/firestore';
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event); // リクエストボディを取得

    body.lastSignedIn = Timestamp.fromDate(new Date()); // 最終ログイン日時を更新

    // @ts-ignore
    const docRef = await updateDoc(doc(db, 'users', event.context.params.userId), body); // ドキュメントを更新

    return { result: 'success' };
  } catch (error) {
    return error;
  }
})
