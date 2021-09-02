<template>
  <div class="main" @click="changeColor" :style="{ background: color }">
    <div>
      <img src="./assets/logo.png" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { sample } from 'lodash'
const colorList = ['pink', 'deepskyblue', 'yellowgreen']
const body = document.body
const initColor = body.style.background || ""
const color = ref(initColor)
watch(() => color.value, () => {
  console.log("color", color.value)
  body.style.background = color.value
})
const changeColor = () => {
  color.value = sample(colorList)
}
</script>

<style scoped lang="less">
// Refused to apply inline style because it violates the following Content Security Policy directive: "default-src 'self'"
// .main {
//   background-color: v-bind(color);
// }

.main {
  display: flex;
  width: fit-content;
  height: fit-content;
  position: absolute;
  justify-content: center;
  align-items: center;
}
</style>
