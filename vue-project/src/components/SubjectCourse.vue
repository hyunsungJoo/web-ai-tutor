<template>
  <div class="courses">
    <h2>Popular Courses</h2>
    <div class="course-list">
      <div class="course-card" v-for="course in courses" :key="course.id">
        <div class="image-container">
          <img :src="course.image" :alt="course.title" class="course-image" />
        </div>
        <div class="course-info">
          <p class="live-badge" v-if="course.isLive">Basic Course</p>
          <h3>{{ course.title }}</h3>
          <p>Duration: {{ course.duration }} weeks</p>
          <button
            class="start-button"
            @click="startLearning(course.title, course.duration)"
          >
            Start Learning
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubjectCourse",
  props: {
    searchBarRef: {
      type: Object,
      required: true, // SearchBar 컴포넌트의 참조가 필수
    },
  },
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "JAVA",
          duration: 2,
          isLive: true,
          image: require("@/assets/java.png"),
        },
        {
          id: 2,
          title: "PYTHON",
          duration: 2,
          isLive: true,
          image: require("@/assets/python.png"),
        },
      ],
    };
  },
  methods: {
    startLearning(title, duration) {
      const searchQuery = `${title} ${duration}주로 나눠 공부계획 짜줘`;
      if (this.searchBarRef && this.searchBarRef.onSearch) {
        // SearchBar의 메서드를 호출하여 검색 실행
        this.searchBarRef.onSearch(searchQuery);
      } else {
        console.error("SearchBar 참조가 유효하지 않습니다.");
      }
    },
  },
};
</script>

<style scoped>
/* 전체 레이아웃 스타일 */
.courses {
  font-family: Arial, sans-serif;
  padding: 20px;
}

/* 카드 리스트 스타일 */
.course-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* 개별 카드 스타일 */
.course-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 500px;
}

/* 이미지 컨테이너 스타일 */
.image-container {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}

.course-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* 카드 정보 스타일 */
.course-info {
  padding: 15px;
  text-align: left;
  flex: 1;
}

.live-badge {
  color: green;
  font-weight: bold;
  margin-bottom: 10px;
}

.start-button {
  background-color: #5c6ef8;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.start-button:hover {
  background-color: #4b5ad6;
}
</style>
