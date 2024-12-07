<template>
  <div id="app">
    <!-- HeaderBar 컴포넌트 -->
    <HeaderBar />

    <!-- SearchBar에 ref 추가 -->
    <SearchBar ref="searchBar" @add-events="addEvents" />

    <!-- CalendarComponent에 events 전달 -->
    <CalendarComponent :events="events" />

    <!-- SubjectCourse에 SearchBar 참조 전달 -->
    <SubjectCourse :searchBarRef="$refs.searchBar" />
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
      events: [], // 스케줄 데이터를 관리하는 배열
    };
  },
  methods: {
    addEvents(newEvents) {
      // SearchBar에서 전달받은 새 이벤트를 추가
      this.events = [...this.events, ...newEvents]; // 기존 이벤트에 새 이벤트를 병합
    },
  },
};
</script>

<style>
/* 전체 스타일 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

#app {
  text-align: center;
}
</style>
