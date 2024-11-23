<template>
  <div id="app">
    <HeaderBar />
    <SearchBar />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import SearchBar from "./components/SearchBar.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    SearchBar,
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
