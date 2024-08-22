<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r relative">
      <div class="p-4 border-b">
        <input type="text" placeholder="Search in dashboard..." class="w-full p-2 border rounded">
      </div>
      <div class="overflow-y-auto pt-4 px-4">
        <div @click="focusChat(user)" v-for="user in users"
             class="p-4 border-b flex items-center cursor-pointer hover:bg-blue-50 rounded-md">
          <img :src="user.avatar" alt="User" class="object-cover w-10 h-10 rounded-full mr-2">
          <div>
            <div class="font-bold">{{ user.firstName }} {{ user.lastName }}</div>
            <div class="text-sm text-gray-500">Ai sợ thì đi về</div>
          </div>
        </div>
      </div>
      <ul class="m-0 flex justify-between h-[3.5rem] w-full absolute bottom-0 left-0 border-t border-gray-200">
        <li class="cursor-pointer hover:hover:bg-blue-50 self-center w-full flex justify-center bg h-full">
          <RiMessage2Line class="size-6 cursor-pointer text-muted font-medium hover:text-primary self-center"/>
        </li>
        <li class="cursor-pointer hover:hover:bg-blue-50 self-center w-full flex justify-center h-full">
          <RiTeamLine class="size-6 cursor-pointer text-muted font-medium hover:text-primary self-center"/>
        </li>
        <li class="cursor-pointer hover:hover:bg-blue-50 self-center w-full flex justify-center h-full">
          <RiCommunityLine class="size-6 cursor-pointer text-muted font-medium hover:text-primary self-center"/>
        </li>
      </ul>
    </div>

    <!-- Chat Area -->
    <BoxChat :user="userFocus" @sendRoomId="getRoomId"/>
  </div>
</template>
<script setup lang="ts">
import {RiCommunityLine, RiTeamLine, RiMessage2Line} from "vue-remix-icons";
import {ref, onMounted} from 'vue'
import {socket} from "@/socket.js";
import {api} from "@/api";
import Message from "ant-design-vue/es/message";
import BoxChat from "@/components/message/BoxChat.vue";
import type {User} from "@/dataType";


onMounted(() => {
  fetchListUser()
})

const users = ref([])
const fetchListUser = async () => {
  try {
    const params = {
      page: 1,
      limit: 0
    }
    const response = await api.user.list(params)
    users.value = response.data.data
    return true
  } catch (e) {
    console.log(e)
  }
}
const userFocus = ref<User>({})
const focusChat = (user: User) => {
  userFocus.value = user
}

const getRoomId = (roomId: number) => {
  console.log('vào room: ' + roomId)
}
</script>
