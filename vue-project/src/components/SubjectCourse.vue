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
          <button class="start-button">Start Learning</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        {
          id: 1,
          title: "JAVA",
          duration: 8,
          isLive: true,
          image: require('@/assets/java.png'),
        },
        {
          id: 2,
          title: "PYTHON",
          duration: 12,
          isLive: true,
          image: require('@/assets/python.png'),
        },
      ],
    };
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
  display: grid; /* 그리드 레이아웃 사용 */
  grid-template-columns: repeat(2, 1fr); /* 한 행에 두 개의 카드 표시 */
  gap: 20px; /* 카드 간격 */
}

/* 개별 카드 스타일 */
.course-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden; /* 카드 밖으로 내용이 넘치지 않게 설정 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; /* 카드 안의 요소를 세로로 배치 */
  height: 500px; /* 카드 전체 높이 고정 */
}

/* 이미지 컨테이너 스타일 */
.image-container {
  width: 100%; /* 카드의 전체 너비 차지 */
  height: 60%; /* 카드 높이의 60%만 차지 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9; /* 이미지 여백 배경색 */
}

.course-image {
  max-width: 100%; /* 이미지의 최대 너비를 카드에 맞춤 */
  max-height: 100%; /* 이미지의 최대 높이를 컨테이너에 맞춤 */
  object-fit: contain; /* 이미지를 비율에 맞게 전체 표시 */
}

/* 카드 정보 스타일 */
.course-info {
  padding: 15px;
  text-align: left;
  flex: 1; /* 나머지 공간을 차지 */
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
