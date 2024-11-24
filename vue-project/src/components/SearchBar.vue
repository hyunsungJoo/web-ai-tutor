<template>
    <div class="search-bar-container">
      <!-- 검색창 -->
      <div class="search-bar">
        <input
          type="text"
          class="search-input"
          placeholder="Ask ChatGPT..."
          v-model="searchQuery"
          @keypress.enter="onSearch"
        />
        <span class="search-icon" @click="onSearch">
          <i class="fa fa-search"></i>
        </span>
      </div>
  
      <!-- 결과 출력 -->
      <div class="response" v-if="response">
        <h3>ChatGPT's Response:</h3>
        <p>{{ response }}</p>
      </div>
  
      <!-- 로딩 상태 -->
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
        searchQuery: "", // 사용자 입력
        response: null, // ChatGPT 응답
        loading: false, // 로딩 상태
        lastRequestTime: 0, // 마지막 요청 시간
      };
    },
    methods: {
      async onSearch() {
        if (!this.searchQuery.trim()) {
          alert("Please enter a question!");
          return;
        }
  
        // 요청 중복 방지
        if (this.loading) {
          alert("Please wait for the current request to complete.");
          return;
        }
  
        // 요청 간 딜레이 추가 (최소 2초)
        const now = Date.now();
        if (now - this.lastRequestTime < 2000) {
          alert("You're sending requests too quickly. Please wait a moment.");
          return;
        }
        this.lastRequestTime = now;
  
        this.loading = true;
        this.response = null;
  
        try {
          const apiKey = process.env.VUE_APP_OPENAI_API_KEY;
  
          // ChatGPT API 요청
          const res = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: this.searchQuery }],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
            }
          );
  
          this.response = res.data.choices[0].message.content;
        } catch (error) {
          if (error.response && error.response.status === 429) {
            alert(
              "Rate limit exceeded. Please wait a few seconds and try again."
            );
          } else {
            console.error("Error:", error.response ? error.response.data : error.message);
            this.response = "Sorry, something went wrong. Please try again.";
          }
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar-container {
    width: 100%;
    max-width: 600px;
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
  