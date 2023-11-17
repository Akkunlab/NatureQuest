<template>
  <v-app>
    <slot />
  </v-app>
</template>

<style lang="scss">

  /* ページ全体の背景色 */
  .v-application__wrap {
    background-color:hsla(232, 100%, 76%, 1);
    background-image:
    radial-gradient(at 38% 9%,  hsla(28, 100%, 74%, 1) 0px,  transparent 50%),
    radial-gradient(at 93% 15%,  hsla(189, 100%, 51%, 1) 0px,  transparent 50%),
    radial-gradient(at 0% 91%,  hsla(340, 100%, 66%, 1) 0px,  transparent 50%),
    radial-gradient(at 0% 65%,  hsla(22, 100%, 77%, 1) 0px,  transparent 50%),
    radial-gradient(at 100% 87%,  hsla(240, 98%, 64%, 1) 0px,  transparent 50%),
    radial-gradient(at 6% 10%,  hsla(323, 100%, 74%, 1) 0px,  transparent 50%);
  }
</style>
