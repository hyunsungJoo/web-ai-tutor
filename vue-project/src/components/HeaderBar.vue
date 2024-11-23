<template>
    <div class="header-bar">
      <!-- 왼쪽 로고 -->
      <div class="logo">AI TUTOR</div>
  
      <!-- 우측 아이콘 -->
      <div class="icons">
        <!-- 달력 아이콘 -->
        <span class="icon" @click="onCalendarClick">
          <i class="fa fa-calendar"></i>
        </span>
  
        <!-- 마이페이지 아이콘 -->
        <span class="icon" @click="onProfileClick">
          <i class="fa fa-user"></i>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "HeaderBar",
    methods: {
      // 달력 클릭 이벤트
      onCalendarClick() {
        alert("달력 아이콘 클릭됨!");
      },
      // 마이페이지 클릭 이벤트
      onProfileClick() {
        alert("마이페이지 아이콘 클릭됨!");
      },
    },
  };
  </script>
  
  <style scoped>
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  
  /* 로고 스타일 */
  .logo {
    font-size: 20px;
    font-weight: bold;
  }
  
  /* 아이콘 컨테이너 스타일 */
  .icons {
    display: flex;
    gap: 20px; /* 아이콘 간격 */
  }
  
  /* 아이콘 개별 스타일 */
  .icon {
    font-size: 18px;
    cursor: pointer;
    color: #333; /* 기본 색상 */
    transition: color 0.3s ease;
  }
  
  .icon:hover {
    color: #007bff; /* 호버 시 색상 */
  }
  </style>
  