/* ============================================
No.10
Method: POST
URI: /api/login
Description: ユーザのログイン認証
============================================ */

import { db } from '../lib/firestore';
import { collection, doc, updateDoc, query, where, getDocs, Timestamp } from "firebase/firestore";
import { randomBytes, createHash } from 'crypto';
import { User } from '@/types/user';

export default defineEventHandler(async (event) => {

  try {
    let user: User | undefined; // ユーザ情報
    let docId: string = ''; // ドキュメントID
    const body = await readBody(event); // リクエストボディを取得

    // idまたはloginが存在しない場合はエラーを返す
    if (!body.id || !body.login) throw createError({ statusCode: 400, statusMessage: 'Invalid id or login value' });

    // ユーザのドキュメントを取得
    const q = query(collection(db, 'users'), where('login', '==', body.login));
    const querySnapshot = await getDocs(q);

    // ドキュメントが存在しない場合
    if (querySnapshot.empty) throw createError({ statusCode: 401, statusMessage: 'Authentication failed' });
    
    // ドキュメントが存在する場合
    querySnapshot.forEach((docData) => {
      body.id = createHash('sha256').update(body.id + docData.data().salt).digest('hex'); // ハッシュ化

      // ログイン失敗
      if (docData.data().id !== body.id) throw createError({ statusCode: 401, statusMessage: 'Authentication failed' });

      // ログイン成功
      user = {
        name: docData.data().name,
        ranking: docData.data().ranking,
        point: docData.data().point
      };

      docId = docData.id; // ドキュメントIDを取得
    });

    // ログイン成功
    const loginId = randomBytes(32).toString('hex'); // login idを生成

    // ドキュメントを更新
    const docRef = await updateDoc(doc(db, 'users', docId), {
      login: loginId, // login idを更新
      lastSignedIn: Timestamp.fromDate(new Date()) // 最終ログイン日時を更新
    });

    event.node.res.setHeader('Authorization', `Bearer ${loginId}`); // login idをヘッダーにセット

    return { result: 'success', data: user };
  } catch (error) {
    return error;
  }
})
