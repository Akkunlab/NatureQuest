/* ============================================
No.9
Method: DELETE
URI: /api/users/{userId}
Description: 特定のユーザを削除
============================================ */

import { db } from '../../lib/firestore';
import { doc, deleteDoc } from "firebase/firestore";

export default defineEventHandler(async (event) => {

  try {

    // @ts-ignore
    await deleteDoc(doc(db, 'users', event.context.params.userId)); // ドキュメントを削除

    return { result: 'success' };
  } catch (error) {
    return error;
  }
})
