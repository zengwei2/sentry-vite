<script setup>
import * as Sentry from "@sentry/vue";

function handleClick() {
  // Sentry.captureMessage("Something went wrong");
  console.log(abc);
  // return new Promise((resolve, reject) => {
  //   reject("error1");
  // });
}
</script>

<template>
  <div>
    <h1>home</h1>
    <button @click="handleClick">点击</button>
  </div>
</template>

<style lang="scss" scoped>
</style>