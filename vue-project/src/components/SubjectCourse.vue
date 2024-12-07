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
            @click="startLearning(course.title)"
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
      required: true,
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
    startLearning(title) {
      const today = new Date();
      const twoWeeksLater = new Date(today);
      twoWeeksLater.setDate(today.getDate() + 13);

      const formatDate = (date) => {
        return date.toISOString().split("T")[0];
      };

      const searchQuery = `${title} 스케줄 ${formatDate(today)}부터 ${formatDate(
        twoWeeksLater
      )}까지 짜줘`;

      this.$emit("search", searchQuery); // 부모 컴포넌트에 검색 요청 전달
    },
  },
};
</script>

<style scoped>
/* 동일한 스타일 유지 */
.courses {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.course-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.course-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 500px;
}

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
