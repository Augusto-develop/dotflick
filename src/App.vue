<template>
  <div id="app">
    <AppHeader></AppHeader>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import AppHeader from "./components/layout/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
