<template>
    <div class="modal-overlay" @click.self="closePopup">
      <div class="modal-content">
        <h2>내 수강 정보</h2>
        <ul>
          <li v-for="(course, index) in myCourses" :key="index">
            <h3>{{ course.title }}</h3>
            <p>기간: {{ course.duration }} 주</p>
            <p>상태: {{ course.status }}</p>
          </li>
        </ul>
        <button class="close-button" @click="closePopup">닫기</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MyStudy",
    props: {
      courses: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      closePopup() {
        this.$emit("close"); // 부모 컴포넌트로 팝업 닫기 이벤트 전송
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 600px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .close-button {
    margin-top: 20px;
    background: #ff4d4d;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .close-button:hover {
    background-color: #ff0000;
  }
  </style>
  