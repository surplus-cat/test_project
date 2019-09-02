<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f13460;
  display: flex;
  flex-direction: column;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  &-track {
    // background: #aaa;
  }
  &-corner {
    background: inherit;
  }
  &-thumb {
    background: rgb(220, 220, 220);
    border-radius: 4px;
    &:hover {
      background: rgb(184, 184, 184);
    }
  }
}
</style>
