<template>
  <div id="app">
    <HeaderBar />
    <SearchBar />
    <SubjectCourse />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import SearchBar from "./components/SearchBar.vue";
import SubjectCourse from "./components/SubjectCourse.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    SearchBar,
    SubjectCourse,
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
