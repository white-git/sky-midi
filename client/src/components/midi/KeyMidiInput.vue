<script setup lang="ts">
//
</script>

<template>
  <div class="key-midi-input fixed w-100 h-100 flex items-center justify-center">
    <div class="key-midi-input__bg bg-black w-100 h-100 o-40 absolute"></div>
    <div class="key-midi-input__waiting f4 bg-white pa3 br2 relative">
      <span class="b">Press Key</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.key-midi-input {
  z-index: 1;
  &__bg {
    top: 0;
    left: 0;
  }
}
</style>
