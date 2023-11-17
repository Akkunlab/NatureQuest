/* ============================================
No.7
Method: POST
URI: /api/users/
Description: 新しいユーザを作成
============================================ */

import { db } from '../../lib/firestore';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { randomBytes, createHash } from 'crypto';

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event); // リクエストボディを取得

    body.createdAt = Timestamp.fromDate(new Date()); // 作成日時を追加
    body.lastSignedIn = Timestamp.fromDate(new Date()); // 最終ログイン日時を追加
    body.login = randomBytes(32).toString('hex'); // ランダムな32バイトの値を生成
    body.salt = randomBytes(16).toString('hex'); // ランダムな16バイトのソルトを生成
    body.id = createHash('sha256').update(body.id + body.salt).digest('hex'); // ハッシュ化
    body.ranking = 0;
    body.point = 0;

    const docRef = await addDoc(collection(db, 'users'), body); // ユーザのコレクションにドキュメントを追加

    return { result: 'success', login: body.login };
  } catch (error) {
    return error;
  }
})
