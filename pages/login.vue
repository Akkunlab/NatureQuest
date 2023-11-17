<template>
</template>

<script setup lang="ts">

  /* 認証必須 */
  definePageMeta({
    middleware: 'auth'
  })

  const { login } = useUser(); // ユーザ情報を取得

  login(); // ログイン
</script>
