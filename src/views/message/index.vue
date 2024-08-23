<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r relative">
      <div class="p-4 border-b">
        <input type="text" placeholder="Tìm kiếm" class="w-full p-2 border rounded">
      </div>
      <div  class="overflow-y-auto pt-4 px-4">
        <div @click="focusChat(item)" v-for="item in dataChat"
             class="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-blue-50 rounded-md">
          <div class="flex">
            <img :src="item.avatar" alt="User" class="object-cover w-10 h-10 rounded-full mr-2">
            <div>
              <div class="font-bold">{{ item.firstName }} {{ item.lastName }}</div>
              <div class="text-sm text-gray-500">{{ item?.lastMessage }}</div>
            </div>
          </div>
          <RiCircleFill v-if="usersOnline.includes(item.id)" class="w-3 h-3 text-green-500"></RiCircleFill>
          <RiCircleFill v-else class="w-3 h-3 text-gray-500"></RiCircleFill>
        </div>
      </div>
      <ul class="m-0 flex justify-between h-[3.5rem] w-full absolute bottom-0 left-0 border-t border-gray-200">
        <li @click="setTypeBottomBar(TypeBottomBar.MESSAGE)" :class="typeBottomBar === TypeBottomBar.MESSAGE?'text-primary bg-blue-50':''"
            class="cursor-pointer hover:bg-blue-50 hover:text-primary self-center w-full flex justify-center bg h-full">
          <RiMessage2Line class="size-6 cursor-pointer text-muted font-medium  self-center"/>
        </li>
        <li @click="setTypeBottomBar(TypeBottomBar.TEAM)" :class="typeBottomBar === TypeBottomBar.TEAM?'text-primary bg-blue-50':''"
            class="cursor-pointer hover:bg-blue-50 hover:text-primary self-center w-full flex justify-center bg h-full">
          <RiTeamLine class="size-6 cursor-pointer text-muted font-medium  self-center"/>
        </li>
        <li @click="setTypeBottomBar(TypeBottomBar.COMPANY)" :class="typeBottomBar === TypeBottomBar.COMPANY?'text-primary bg-blue-50':''"
            class="cursor-pointer hover:bg-blue-50 hover:text-primary self-center w-full flex justify-center bg h-full">
          <RiCommunityLine class="size-6 cursor-pointer text-muted font-medium  self-center"/>
        </li>
      </ul>
    </div>

    <!-- Chat Area -->
    <BoxChat :online="usersOnline" :user="userFocus" @sendRoomId="getRoomId"/>
  </div>
</template>
<script setup lang="ts">
import {RiCommunityLine, RiTeamLine, RiMessage2Line, RiCircleFill} from "vue-remix-icons";
import {ref, onMounted, watch} from 'vue'
import {socket} from "@/socket.js";
import {api} from "@/api";
import Message from "ant-design-vue/es/message";
import BoxChat from "@/components/message/BoxChat.vue";
import type {User} from "@/dataType";

let usersOnline = ref([])
onMounted(() => {
  socket.on('getUsersOnline' , (data:any) => {
    usersOnline.value = data
  });
})
enum TypeBottomBar {
    MESSAGE,
    TEAM,
    COMPANY
}

const typeBottomBar = ref(TypeBottomBar.MESSAGE)

const setTypeBottomBar = (type: TypeBottomBar) => {
      if(type === TypeBottomBar.TEAM){
        return alert('Chức năng sẽ được cập nhật trong thời gian tới!')
      }
      typeBottomBar.value = type
}
watch(
    () => typeBottomBar.value,
    (value) => {
        dataChat.value = []
        switch (value){
          case TypeBottomBar.MESSAGE :
            fetchRoomsByUser()
            break;
          case TypeBottomBar.TEAM :
            //TODO xử lý TEAM

            break;
          case TypeBottomBar.COMPANY :
            //TODO xử lý MESSAGE
            fetchUsersCompany()
            break;
          default:
            dataChat.value = []; break;
        }
    }
)
const dataChat = ref<any>([])
const fetchUsersCompany = async (page :number = 1,limit: number = 0) => {
  try {
    const params = {
      page: page,
      limit: limit // limit = 0 là lấy all user
    }
    const response = await api.user.list(params)
    dataChat.value = response.data.data
    return true
  } catch (e) {
    console.log(e)
  }
}

const fetchRoomsByUser = async (page: number = 1) => {
  try {
    const params = { page };
    const response = await api.roomChat.list(params);
    //TODO Vì giờ đang lưu tạm thông tin user vào localStorage nên lấy tạo, phải lưu vào store và lấy ra
    const userLocal = localStorage.getItem('user');
    if (!userLocal) return false;

    const currentUser = JSON.parse(userLocal);
    const data = response.data.data;

    const newChats = data.map((item: any) => {
      const userOther = currentUser.id === item.createdBy.id ? item.recipient : item.createdBy;
      return {
        lastMessage: item.lastMessage.content,
        ...userOther
      };
    });
    dataChat.value.push(...newChats);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
const userFocus = ref<User>({})
const focusChat = (user: User) => {
  userFocus.value = user
}

const getRoomId = (roomId: number) => {
  console.log('vào room: ' + roomId)
}
</script>
