<template>
  <div class="w-3/4 flex flex-col relative">
    <div v-if="isNewRoom" class="justify-center text-primary w-1/2 h-1/5 flex absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-9999">
      <div class="self-center">
        <img class="flex justify-center m-auto" src="/src/assets/icons/bird.svg" alt="bird">
        <span class="font-medium">
          Hãy bắt đầu cuộc hội thoại nào!
        </span>
      </div>
    </div>
    <!-- Header -->
    <div class="flex items-center p-4 border-b">
      <img :src="user?.avatar" alt="User" class="w-10 h-10 rounded-full mr-2">
      <div>
        <div class="font-bold">{{user?.firstName}} {{user?.lastName}}</div>
        <div v-if="props.online?.includes(user?.id)" class="text-sm text-green-500">Online</div>
        <div v-else class="text-sm text-gray-500">Offline</div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 p-4 overflow-y-auto" ref="messagesContainer">
      <div v-for="(group, groupIndex) in messagesData" :key="groupIndex" class="relative pl-[3rem] "  v-if="!isNewRoom">
        <span v-if="groupIndex === 0 || (new Date(group[0].createdAt) - new Date(messagesData[groupIndex - 1][messagesData[groupIndex - 1].length - 1].createdAt)) > 30 * 60 * 1000"
              class="text-muted mb-4 text-sm flex justify-center w-full">
          {{ formatDateChat(group[0]?.createdAt) }}
        </span>
        <img v-if="group[0]?.createdBy?.id === user.id" :src="user?.avatar" alt="User" class="w-8 h-8 mb-4 rounded-full mr-2 absolute bottom-[3rem] left-0">
        <div v-for="(message, index) in group" :key="index"
             :class="(message.createdBy.id !== user.id) ? 'flex justify-end' : 'justify-start'"
             class="flex mb-4">
          <div class="p-3 rounded-lg max-w-xs"
               :class="(message.createdBy.id !== user.id) ? 'bg-primary text-white' : 'relative bg-white'"
               v-html="formatMessageContent(message.content)"></div>
        </div>
      </div>
      <div ref="endOfMessages"></div>
    </div>

    <!-- Input -->
    <div class="flex box-control-chat items-center">
      <div class="relative flex w-full h-full">
        <RiLinksLine @click="triggerFileInput" class="size-6 cursor-pointer text-muted font-medium w-8 hover:text-primary self-center" />
        <input type="file" ref="fileInput" class="hidden" @change="handleFileSelect" />
        <div
            id="editableDiv"
            class="editable-div"
            contenteditable="true"
            @input="autoResizeDiv"
            @focus="updatePlaceholder"
            @blur="updatePlaceholder"
            @keydown="handleKeyDown"
        >
        </div>
        <div id="placeholderEdit" class="placeholder-edit">Nhập tin nhắn</div>
      </div>
      <div>
        <RiEmojiStickerLine class="size-6 cursor-pointer text-muted font-medium hover:text-primary self-center" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {RiEmojiStickerLine, RiLinksLine} from "vue-remix-icons";
import type {Message, User} from "../../dataType";
import type {PropType} from "vue";
import {onMounted, ref, watch} from "vue";
import {api} from "@/api";
import {socket} from "@/socket";
import {formatDateChat} from '../../utils'

const props = defineProps({
  user: {
    type: Object as PropType<User>,
  },
  online:{
    type: Array
  }
})

onMounted(() => {
  const div = document.getElementById('editableDiv') as HTMLDivElement;
  if (div) {
    div.focus();
  }
  const token = localStorage.getItem('token')
  if(token){
    socket.connect()
    socket.on('message.new', (data: any) => {
      console.log(data);
      currentMessages.value.push(data)
      messagesData.value = groupMessages(currentMessages.value);
      scrollToBottom();
    });
  }

})
const endOfMessages = ref<HTMLDivElement | null>(null);
const scrollToBottom = () => {
  if (endOfMessages.value) {
    endOfMessages.value.scrollIntoView({ behavior: 'smooth' });
  }
};
const isNewRoom = ref<Boolean>(true)
const currentRoom = ref<number>(null)
watch(
    () => props.user,
    async (user) => {
      message.value.receiverId = user.id
      const checkRoom = await api.roomChat.find(user.id)
      isNewRoom.value = !checkRoom.data.data
      if(!isNewRoom.value){
        message.value.roomId = checkRoom.data.data.id
        currentRoom.value = checkRoom.data.data.id
        await fetchList(1)
      }
    }
)

const groupMessages = (messages, timeLimit = 30 * 60 * 1000) => {
  let groupedMessages = [];
  let currentGroup = [];
  let lastMessageTime = 0;

  messages.forEach((message, index) => {
    const messageTime = new Date(message.createdAt).getTime();

    if (index === 0 || message.createdBy.id !== currentGroup[0].createdBy.id || (messageTime - lastMessageTime) > timeLimit) {
      if (currentGroup.length > 0) {
        groupedMessages.push(currentGroup);
      }
      currentGroup = [message];
    } else {
      currentGroup.push(message);
    }

    lastMessageTime = messageTime;
  });

  if (currentGroup.length > 0) {
    groupedMessages.push(currentGroup);
  }

  return groupedMessages;
};

const autoResizeDiv = (event: Event) => {
  const div = event.target as HTMLDivElement;
  div.style.height = 'auto';
  div.style.height = `${div.scrollHeight}px`;
  updatePlaceholder();
  updateContent(event);
};
const  updateContent = (event: Event) => {
  const div = event.target as HTMLDivElement;
  message.value.content = div.innerText.replace(/\n+$/, '');
};
const updatePlaceholder = () => {
  const div = document.getElementById('editableDiv') as HTMLDivElement;
  const placeholderEdit = document.getElementById('placeholderEdit') as HTMLDivElement;

  if (div.textContent.trim() === '') {
    placeholderEdit.style.visibility = 'visible';
  } else {
    placeholderEdit.style.visibility = 'hidden';
  }
};
window.addEventListener('load', () => {
  const div = document.getElementById('editableDiv') as HTMLDivElement;
  if (div) {
    div.focus();
    autoResizeDiv({ target: div } as Event);
  }
});
document.getElementById('editableDiv')?.addEventListener('input', autoResizeDiv);
document.getElementById('editableDiv')?.addEventListener('focus', updatePlaceholder);
document.getElementById('editableDiv')?.addEventListener('blur', updatePlaceholder);
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (event.shiftKey) {
      return;
    }
    event.preventDefault();
    sendMessage();
  }
};
const formatMessageContent = (content: string) => {
  return content.replace(/\n/g, '<br>');
};
const currentMessages = ref([])
const messagesData = ref<any>([])
const fetchList = async (page = 1) => {
    if(currentRoom.value){
     try {
       const response = await api.message.find(currentRoom.value, page)
       if(response.status == 200){
         currentMessages.value = response.data.data.messages.reverse()
         const newMessages = groupMessages(currentMessages.value);
         if (page === 1) {
           messagesData.value = newMessages;
         } else {
           messagesData.value.unshift(...newMessages);
         }
       }
     }catch (e){
       console.error(e)
     }
    }
}
 const sendMessage = async () => {
  if (message.value.content.trim()) {
    const response = await api.message.create(message.value)
    const div = document.getElementById('editableDiv') as HTMLDivElement;
    if (div) {
      div.innerHTML = '';
      autoResizeDiv({ target: div } as Event);
    }
    if(response.data) message.value.content = ''
  }
};

const message = ref<Message>({
  content: '',
  roomId: null,
  receiverId: null
});

const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files ? input.files[0] : null;

  if (file) {
    await sendFile(file);
  }
};

const sendFile = async (file: File) => {
  console.log('send file')
};
</script>