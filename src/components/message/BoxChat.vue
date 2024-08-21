<template>
  <div class="w-3/4 flex flex-col relative">
    <div v-if="isNewRoom" class="justify-center  text-primary w-1/2 h-1/5 flex absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-9999">
      <div class="self-center">
        <img class="flex justify-center m-auto" src="/src/assets/icons/bird.svg" alt="bird">
        <span class="font-medium ">
          Hãy bắt đầu cuộc hội thoại nào!
        </span>
      </div>
    </div>
    <!-- Header -->
    <div class="flex items-center p-4 border-b">
      <img :src="user?.avatar" alt="User" class="w-10 h-10 rounded-full mr-2">
      <div>
        <div class="font-bold">{{user.firstName}} {{user.lastName}}</div>
        <div class="text-sm text-green-500">Online</div>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 p-4 overflow-y-auto">
      <div v-for="(message,index) of currentMessages" :key=index v-if="!isNewRoom">
        <div  v-for="(i,index) of message"
             :class="(message[0]?.createdBy?.id !== user.id) ?'flex justify-end':'justify-start'"
             class="flex mb-4">
          <div class="  p-3 rounded-lg max-w-xs"
               :class="(message[0]?.createdBy?.id !== user.id) ?'bg-blue-500 text-white':'relative bg-white'"
          >
            {{i.content}}
          </div>
        </div>
      </div>
    </div>

    <!-- Input -->
    <div class="flex box-control-chat items-center">
      <div class="flex w-full h-full">
        <RiLinksLine class="size-6 cursor-pointer text-muted font-medium w-8 hover:text-primary self-center" />
        <textarea
            v-model="message.content"
            @keydown="handleKeyDownBoxFillChat"
            placeholder="Type your message" class="box-fill-chat text-normal flex-1 h-10 p-2 border rounded mr-2"></textarea>
      </div>
      <div>
        <RiEmojiStickerLine class="size-6 cursor-pointer text-muted font-medium hover:text-primary self-center" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {RiEmojiStickerLine, RiLinksLine} from "vue-remix-icons";
import type {User, Message} from "../../dataType";
import type {PropType} from "vue";
import {onMounted, ref, watch} from "vue";
import {api} from "@/api";
import {socket} from "@/socket";
const props = defineProps({
  user: {
    type: Object as PropType<User>,
  }
})
onMounted(() => {
  socket.connect();
  socket.on('message.new', (data : any) => {
    console.log(data);
  });
})

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
        socket.emit('joinRoom',6 );
        console.log('vào room: ' + currentRoom.value)
        await fetchList(1)
      }
    }
)
const groupMessages = (messages, timeLimit = 5 * 60 * 1000) => { // timeLimit: 5 phút
  let groupedMessages = [];
  let currentGroup = [];
  let lastMessageTime = 0;

  messages.forEach((message, index) => {
    const messageTime = new Date(message.createdAt).getTime();

    if (index === 0) {
      currentGroup.push(message);
    } else {
      const timeDifference = messageTime - lastMessageTime;

      if (message.createdBy.id === currentGroup[0].createdBy.id && timeDifference <= timeLimit) {
        currentGroup.push(message);
      } else {
        groupedMessages.push(currentGroup);
        currentGroup = [message];
      }
    }

    lastMessageTime = messageTime;
  });

  if (currentGroup.length > 0) {
    groupedMessages.push(currentGroup);
  }

  return groupedMessages;
};
const adjustBoxControlChatHeight = (textarea: HTMLTextAreaElement) => {
  const boxControlChat = textarea.closest('.box-control-chat') as HTMLElement;
  if (boxControlChat) {
    boxControlChat.style.height = 'auto';
    boxControlChat.style.height = `${Math.min(textarea.scrollHeight + 10, 500)}px`;
  }
};

const handleKeyDownBoxFillChat = (event: KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement;

  if (event.key === 'Enter') {
    if (event.ctrlKey) {
      event.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '\n' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      textarea.dispatchEvent(new Event('input'));
      textarea.scrollTop = textarea.scrollHeight;
      adjustBoxControlChatHeight(textarea);
    } else {
      event.preventDefault();
      sendMessage();
    }
  }
};

const autoResizeBoxFillChat = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`;
};

const handleInput = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  autoResizeBoxFillChat(event);
  adjustBoxControlChatHeight(textarea);
};

const currentMessages = ref([])
const fetchList = async (page = 1) => {
    if(currentRoom.value){
     try {
       const response = await api.message.find(currentRoom.value, page)
       if(response.status == 200){
         const newMessages = groupMessages(response.data.data.messages.reverse());
         if (page === 1) {
           currentMessages.value = newMessages;
         } else {
           currentMessages.value.unshift(...newMessages);
         }
         console.log(currentMessages.value)
       }
     }catch (e){
       console.error(e)
     }
    }
}
const emit = defineEmits(["sendRoomId"])
 const sendMessage = async () => {
  if (message.value.content.trim()) {
    const response = await api.message.create(message.value)
    emit('sendRoomId', currentRoom.value)
    if(response.data) message.value.content = ''
  }
};

const message = ref<Message>({
  content: '',
  roomId: null,
  receiverId: null
});
</script>