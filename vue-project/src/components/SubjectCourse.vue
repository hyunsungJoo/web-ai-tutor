<template>
    <div class="courses">
      <h2>Popular Courses</h2>
      <div class="course-list">
        <div class="course-card" v-for="course in courses" :key="course.id">
          <img :src="course.image" :alt="course.title" class="course-image" />
          <div class="course-info">
            <p class="live-badge" v-if="course.isLive">● Live Course</p>
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
    title: "Mathematics Mastery",
    duration: 8,
    isLive: true,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Advanced Physics",
    duration: 12,
    isLive: true,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // 같은 이미지 사용 (다른 이미지 사용 가능)
  },
],
      };
    },
  };
  </script>
  
  <style scoped>
  .courses {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .course-list {
    display: flex;
    justify-content: space-between; /* Adjusts spacing between cards */
    gap: 20px;
  }
  
  .course-card {
    flex: 1; /* Makes each card take equal space */
    max-width: calc(50% - 20px); /* Ensures two cards fit in one row with a gap */
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .course-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .course-info {
    padding: 15px;
    text-align: left;
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
  