<template>
  <div id="app">
    <HeaderBar />
    <SearchBar ref="searchBar" @add-events="addEvents" />
    <CalendarComponent :events="events" />
    <SubjectCourse :searchBarRef="$refs.searchBar" @search="handleSearch" />
  </div>
</template>

<script>
import HeaderBar from "./components/HeaderBar.vue";
import SearchBar from "./components/SearchBar.vue";
import SubjectCourse from "./components/SubjectCourse.vue";
import CalendarComponent from "./components/CalendarComponent.vue";

export default {
  name: "App",
  components: {
    HeaderBar,
    SearchBar,
    CalendarComponent,
    SubjectCourse,
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {
    addEvents(newEvents) {
      this.events = [...this.events, ...newEvents];
    },
    handleSearch(query) {
      // 검색창에 입력된 내용을 설정한 뒤 검색 실행
      if (this.$refs.searchBar) {
        this.$refs.searchBar.searchQuery = query; // 검색창 텍스트 설정
        this.$refs.searchBar.onSearch(); // 검색 실행
      }
    },
  },
};
</script>

<style>
/* 동일한 스타일 유지 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

#app {
  text-align: center;
}
</style>
