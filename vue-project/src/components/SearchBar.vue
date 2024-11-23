<template>
    <div class="search-bar">
      <input
        type="text"
        class="search-input"
        placeholder="Search courses, subjects..."
        v-model="searchQuery"
        @keypress.enter="onSearch"
      />
      <span class="search-icon" @click="onSearch">
        <i class="fa fa-search"></i>
      </span>
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchBar",
    data() {
      return {
        searchQuery: "", // 검색어 저장
      };
    },
    methods: {
      onSearch() {
        if (this.searchQuery.trim()) {
          alert(`Searching for: ${this.searchQuery}`);
          // 실제 검색 동작을 여기에 추가
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 0 auto; /* 가운데 정렬 */
    margin-top: 30px;
    background: #fff;
    border-radius: 25px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 10px 20px;
  }
  
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 20px;
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
    color: #007bff; /* 아이콘 호버 시 색상 */
  }
  </style>
  