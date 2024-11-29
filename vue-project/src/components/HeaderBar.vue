<template>
  <div>
    <div class="header-bar">
      <div class="logo">AI TUTOR</div>
      <div class="icons">
        <!-- 달력 아이콘 -->
        <span class="icon" @click="toggleCalendar">
          <i class="fa fa-calendar"></i>
        </span>

        <!-- 마이페이지 아이콘 -->
        <span class="icon" @click="toggleMyStudy">
          <i class="fa fa-user"></i>
        </span>
      </div>
    </div>

    <!-- 달력 팝업 -->
    <div v-if="showCalendar" class="modal-overlay" @click.self="closeCalendar">
      <div class="modal-content">
        <!-- 달력 헤더 -->
        <div class="calendar-header">
          <button @click="prevMonth">이전</button>
          <h2>{{ formattedMonth }}</h2>
          <button @click="nextMonth">다음</button>
        </div>

        <!-- 달력 본문 -->
        <div class="calendar">
          <div
            class="day"
            v-for="(day, index) in days"
            :key="index"
            :class="{ 'has-event': hasEvent(day) }"
            @click="selectDate(day)"
          >
            <span>{{ day.getDate() }}</span>
          </div>
        </div>

        <!-- 선택된 날짜의 일정 -->
        <div class="schedule">
          <h3>선택된 날짜: {{ selectedDateDisplay }}</h3>
          <ul>
            <li v-for="(event, index) in selectedEvents" :key="index">
              {{ event.description }}
            </li>
            <li v-if="selectedEvents.length === 0">해당 날짜에 일정이 없습니다.</li>
          </ul>
        </div>

        <button class="close-button" @click="closeCalendar">닫기</button>
      </div>
    </div>

    <!-- MyStudy 팝업 -->
    <MyStudy v-if="showMyStudy" :myCourses="myCourses" @close="toggleMyStudy" />
  </div>
</template>

<script>
import MyStudy from "./MyStudy.vue";

export default {
  name: "CalendarPopup",
  components: {
    MyStudy,
  },
  data() {
    return {
      showCalendar: false, // 달력 팝업 상태
      showMyStudy: false, // 마이페이지 팝업 상태
      currentDate: new Date(), // 현재 날짜
      selectedDate: null, // 선택된 날짜
      events: [
        { date: "2024-11-30", description: "회의 참석" },
        { date: "2024-12-01", description: "프로젝트 마감" },
        { date: "2024-12-02", description: "팀 회식" },
      ], // 예제 일정
      myCourses: [
        { title: "Java Programming", duration: 8, status: "진행 중" },
        { title: "Python for AI", duration: 12, status: "진행 중" },
      ], // 수강 중인 강의
    };
  },
  computed: {
    formattedMonth() {
      return `${this.currentDate.getFullYear()}년 ${
        this.currentDate.getMonth() + 1
      }월`;
    },
    days() {
      const startOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      const endOfMonth = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      );
      const days = [];
      for (let i = startOfMonth.getDate(); i <= endOfMonth.getDate(); i++) {
        days.push(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i));
      }
      return days;
    },
    selectedDateDisplay() {
      if (!this.selectedDate) return "날짜를 선택하세요.";
      return `${this.selectedDate.getFullYear()}-${String(
        this.selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(this.selectedDate.getDate()).padStart(2, "0")}`;
    },
    selectedEvents() {
      if (!this.selectedDate) return [];
      const selectedDateStr = `${this.selectedDate.getFullYear()}-${String(
        this.selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(this.selectedDate.getDate()).padStart(2, "0")}`;
      return this.events.filter((event) => event.date === selectedDateStr);
    },
  },
  methods: {
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    closeCalendar() {
      this.showCalendar = false;
    },
    toggleMyStudy() {
      this.showMyStudy = !this.showMyStudy;
    },
    prevMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
    },
    selectDate(day) {
      this.selectedDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
      );
    },
    hasEvent(day) {
      const dayStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(day.getDate()).padStart(2, "0")}`;
      return this.events.some((event) => event.date === dayStr);
    },
  },
};
</script>

<style scoped>
/* 헤더 스타일 */
.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
}

/* 로고 스타일 */
.logo {
  font-size: 20px; /* 이전 상태 유지 */
  font-weight: bold;
}

/* 아이콘 컨테이너 스타일 */
.icons {
  display: flex;
  gap: 20px;
}

/* 아이콘 개별 스타일 */
.icon {
  font-size: 18px; /* 이전 상태 유지 */
  cursor: pointer;
}

/* 모달 스타일 */
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

/* 달력 스타일 */
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.calendar-header h2 {
  margin: 0;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}

.day {
  text-align: center;
  cursor: pointer;
}

.day span {
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
  transition: background-color 0.3s ease;
}

.day span:hover {
  background-color: #007bff;
  color: #fff;
}

.day.has-event span {
  background-color: #ffcccb;
}

/* 일정 스타일 */
.schedule {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.schedule h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.schedule ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.schedule li {
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.schedule li:last-child {
  border-bottom: none;
}
</style>
