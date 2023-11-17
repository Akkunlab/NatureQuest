<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">

  /* フォント設定 */
  $font-family: 'Noto Sans JP', 'Roboto', sans-serif; // フォントを指定

  .v-application {
    font-family: $font-family !important;

    [class*='text-'] {
      font-family: $font-family !important;
    }
  }
</style>
