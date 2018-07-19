<template>
  <div id="app">
    <upload
    :qiniuToken="qiniuToken"
    :onSuccess="onSuccess"
    :onError="onError"
    :onProgress="onProgress"
    :path="'123'"
    >
    <button>上传</button>
    </upload>
  </div>
</template>

<script>

import Upload from './components/upload.vue'
import axios from 'axios'

export default {
  name: 'app',
  data(){
    return {
      qiniuToken:'XL7EoDlOL21v8W0IukwUFIHuqsms12UAqrh3YUFB:EgU2KI82fCY46wMj4MF2p2mRQmA=:eyJlbmRVc2VyIjoiMCIsImNhbGxiYWNrVXJsIjoiaHR0cHM6Ly9iZXRhLmhhbG92ZS5jb20vdjEvY2FsbGJhY2svcWluaXUuanNvbiIsInNhdmVLZXkiOiIkKGVuZFVzZXIpLyQoeDpldmVudCkvJChldGFnKSIsInNjb3BlIjoiaXZvbGxvIiwiY2FsbGJhY2tCb2R5VHlwZSI6ImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCIsImNhbGxiYWNrSG9zdCI6ImJldGEuaGFsb3ZlLmNvbSIsImNhbGxiYWNrQm9keSI6ImZpbGVuYW1lXHUwMDNkJChmbmFtZSlcdTAwMjZmaWxlc2l6ZVx1MDAzZCQoZnNpemUpXHUwMDI2dXNlcklkXHUwMDNkJChlbmRVc2VyKVx1MDAyNmtleVx1MDAzZCQoa2V5KVx1MDAyNmJ1Y2tldFx1MDAzZCQoYnVja2V0KVx1MDAyNmV2ZW50XHUwMDNkJCh4OmV2ZW50KVx1MDAyNmV4dHJhXHUwMDNkJCh4OmV4dHJhKVx1MDAyNnR5cGVcdTAwM2QkKHg6dHlwZSlcdTAwMjZhbGJ1bUlkXHUwMDNkJCh4OmFsYnVtSWQpXHUwMDI2ZXZlbnRJZFx1MDAzZCQoeDpldmVudElkKVx1MDAyNnJlc291cmNlSWRcdTAwM2QkKHg6cmVzb3VyY2VJZClcdTAwMjZhdmluZm9cdTAwM2QkKGF2aW5mbylcdTAwMjZtdFx1MDAzZCQobWltZVR5cGUpXHUwMDI2ZXhpZlx1MDAzZCQoZXhpZilcdTAwMjZpbWFnZUluZm9cdTAwM2QkKGltYWdlSW5mbylcdTAwMjZ0YXJnZXRVc2VySWRcdTAwM2QkKHg6dGFyZ2V0VXNlcklkKVx1MDAyNmdyb3VwSWRcdTAwM2QkKHg6Z3JvdXBJZClcdTAwMjZjb21tZW50SWRcdTAwM2QkKHg6Y29tbWVudElkKVx1MDAyNmV4cHJlc3Npb25JZFx1MDAzZCQoeDpleHByZXNzaW9uSWQpIiwiZGVhZGxpbmUiOjE1MzE4MTMzNTd9'
    }
  },
  methods:{
    onSuccess(){
      console.log(arguments)
    },
    onError(error){
      console.log(error)
    },
    onProgress(res){
      this.percent = res.total.percent.toFixed(2)
      console.log(res.total)
    }
  },
  components: {
    Upload
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
