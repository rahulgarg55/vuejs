<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/form">Add Employee</router-link> |
      <router-link to="/table">View Table</router-link>
    </div>
    <router-view />
  </div>
</template>
