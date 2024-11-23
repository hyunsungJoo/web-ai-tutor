<template>
  <div id="app">
    <HeaderBar />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

#app {
  text-align: center;
}
</style>
