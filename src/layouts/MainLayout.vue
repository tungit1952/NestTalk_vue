<template>
  <main class="flex min-h-screen flex-row bg-gray-100 text-gray-800">
      <Sidebar/>
      <div class="flex flex-col w-full">
<!--          <Topbar/>-->
          <div class="main -ml-48 flex flex-grow flex-col transition-all duration-150 ease-in md:ml-0">
            <a-config-provider :theme="{token: { colorPrimary: '#195bb0'}}">
              <router-view />
            </a-config-provider>
          </div>
      </div>
  </main>
</template>
<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import {onMounted} from "vue";
import {socket} from "@/socket.js";
onMounted(() => {
  const token = localStorage.getItem('token')
  if(token){
    socket.io.open()
  }
})
</script>
