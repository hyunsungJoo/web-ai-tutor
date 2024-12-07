<template>
  <div class="calendar-container">
    <div class="calendar-header">
      <button @click="prevMonth">이전</button>
      <h2>{{ formattedMonth }}</h2>
      <button @click="nextMonth">다음</button>
    </div>
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
    <div class="schedule">
      <h3>선택된 날짜: {{ selectedDateDisplay }}</h3>
      <ul>
        <li v-for="(event, index) in selectedEvents" :key="index">
          {{ event.description }}
        </li>
        <li v-if="selectedEvents.length === 0">해당 날짜에 일정이 없습니다.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarComponent",
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentDate: new Date(),
      selectedDate: null,
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
      return this.selectedDate.toLocaleDateString("en-CA"); // YYYY-MM-DD
    },
    selectedEvents() {
      if (!this.selectedDate) return [];
      const selectedDateStr = this.selectedDate.toLocaleDateString("en-CA");
      return this.events.filter((event) => event.date === selectedDateStr);
    },
  },
  methods: {
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
      this.selectedDate = day;
    },
    hasEvent(day) {
      const dayStr = day.toLocaleDateString("en-CA"); // YYYY-MM-DD
      return this.events.some((event) => event.date === dayStr);
    },
  },
};
</script>

<style scoped>
.calendar-container {
  margin: 20px auto;
  max-width: 600px;
  text-align: center;
}

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

.schedule {
  margin-top: 20px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>
