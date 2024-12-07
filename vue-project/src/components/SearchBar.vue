<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        placeholder="Ask ChatGPT (예: 자바 스케줄 작성해줘)"
        v-model="searchQuery"
        @keypress.enter="onSearch"
      />
      <span class="search-icon" @click="onSearch">
        <i class="fa fa-search"></i>
      </span>
    </div>
    <div class="response" v-if="response">
      <h3>ChatGPT's Response:</h3>
      <p>{{ response }}</p>
    </div>
    <div v-if="loading" class="loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "", // 입력된 검색 쿼리
      response: null,
      loading: false,
    };
  },
  methods: {
    async onSearch() {
      if (!this.searchQuery.trim()) {
        alert("Please enter a question!");
        return;
      }

      if (this.loading) {
        alert("Please wait for the current request to complete.");
        return;
      }

      this.loading = true;
      this.response = null;

      try {
        const apiKey = process.env.VUE_APP_OPENAI_API_KEY;
        const today = new Date().toISOString().split("T")[0];
        const finalQuery = `${this.searchQuery}\n\n오늘 날짜(${today}) 이후로만 스케줄을 작성해줘.\n형식은 다음과 같아야 해:\nYYYY-MM-DD 학습 내용`;

        const res = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: finalQuery }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        this.response = res.data.choices[0].message.content;

        const parsedEvents = this.parseSchedule(this.response);
        this.$emit("add-events", parsedEvents);
        alert("스케줄이 추가되었습니다!");
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        alert("스케줄 생성 중 문제가 발생했습니다.");
      } finally {
        this.loading = false;
      }
    },
    parseSchedule(scheduleText) {
      const lines = scheduleText.split("\n");
      const events = [];

      lines.forEach((line) => {
        const match = line.match(/(\d{4}-\d{2}-\d{2})\s+(.+)/);
        if (match) {
          events.push({ date: match[1], description: match[2] });
        }
      });

      return events;
    },
  },
};
</script>

<style scoped>
/* 동일한 스타일 유지 */
.search-bar-container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  text-align: center;
}

.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #555;
  background: transparent;
}

.search-input::placeholder {
  color: #aaa;
}

.search-icon {
  font-size: 18px;
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;
}

.search-icon:hover {
  color: #007bff;
}

.response {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.loading {
  margin-top: 20px;
  font-size: 14px;
  color: #555;
}
</style>
