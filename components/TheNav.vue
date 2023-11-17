<template>
  <v-navigation-drawer color="rgba(255, 255, 255, 0.5)" width="240" style="box-shadow: -4px 0 8px 0 rgba(0, 0, 0, 0.2) inset;">

    <!-- タイトル -->
    <v-sheet class="pa-4 font-weight-bold" color="rgba(0, 0, 0, 0)">
      福島高専コンテスト
    </v-sheet>

    <!-- メニュー -->
    <v-list nav class="px-2">
      <v-list-item v-for="menu in menuList" :key="menu.text" :to="menu.url">
        <template v-slot:prepend>
          <v-icon>{{ menu.icon }}</v-icon>
        </template>
        <v-list-item-title class="text-subtitle-1">{{ menu.text }}</v-list-item-title>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script setup lang="ts">

  /* メニューリスト */
  const menuList = [
    { icon: 'mdi-home', text: 'Home', url: '/admin' },
    { icon: 'mdi-help-circle', text: 'Quizzes', url: '/admin/quizzes' },
    { icon: 'mdi-account', text: 'Users', url: '/admin/users' }
  ];
</script>
