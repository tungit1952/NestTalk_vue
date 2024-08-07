<script setup lang="ts">
import { RiLinksLine, RiEmojiStickerLine } from "vue-remix-icons";
import { ref, onMounted } from 'vue'
import {socket} from "@/socket.js"

onMounted(() => {
  socket.connect();
  socket.emit('createChat', 'Hế lô');
})
const autoResizeBoxFillChat = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  textarea.style.height = 'auto';
  textarea.style.height = `${Math.min(textarea.scrollHeight, 500)}px`; // Cập nhật chiều cao của textarea
}

const handleKeyDownBoxFillChat = (event: KeyboardEvent) => {
  const textarea = event.target as HTMLTextAreaElement;

  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.style.height = 'auto';
    textarea.value = textarea.value.substring(0, start) + '\n' + textarea.value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 1;
    textarea.dispatchEvent(new Event('input'));
    textarea.scrollTop = textarea.scrollHeight;
    adjustBoxControlChatHeight(textarea);
  }
}

const adjustBoxControlChatHeight = (textarea: HTMLTextAreaElement) => {
  const boxControlChat = textarea.closest('.box-control-chat') as HTMLElement;
  if (boxControlChat) {
    // Đặt lại chiều cao của box-control-chat
    boxControlChat.style.height = 'auto';
    // Điều chỉnh chiều cao của box-control-chat dựa trên chiều cao của textarea
    boxControlChat.style.height = `${Math.min(textarea.scrollHeight + 10, 500)}px`;
  }
}

// Hàm lắng nghe sự kiện input để điều chỉnh chiều cao
const handleInput = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement;
  autoResizeBoxFillChat(event);
  adjustBoxControlChatHeight(textarea);
}
</script>

<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-1/4 bg-white border-r">
            <div class="p-4 border-b">
                <input type="text" placeholder="Search in dashboard..." class="w-full p-2 border rounded">
            </div>
            <div class="overflow-y-auto  pt-4 px-4">
                <div class="p-4 border-b flex items-center cursor-pointer hover:bg-blue-50 rounded-md">
                    <img src="/src/assets/images/luffy_avatar.jpg" alt="User" class="w-10 h-10 rounded-full mr-2">
                    <div>
                        <div class="font-bold">Luffy</div>
                        <div class="text-sm text-gray-500">Agents</div>
                    </div>
                </div>
                <div class="p-4 border-b flex items-center cursor-pointer hover:bg-blue-50 rounded-md">
                    <img src="/src/assets/images/luffy_avatar.jpg" alt="User" class="w-10 h-10 rounded-full mr-2">
                    <div>
                        <div class="font-bold">Eten Hunt</div>
                        <div class="text-sm text-gray-500">Agents</div>
                    </div>
                </div>

            </div>
        </div>

        <!-- Chat Area -->
        <div class="w-3/4 flex flex-col">
            <!-- Header -->
            <div class="flex items-center p-4 border-b">
                <img src="/src/assets/images/luffy_avatar.jpg" alt="User" class="w-10 h-10 rounded-full mr-2">
                <div>
                    <div class="font-bold">Luffy</div>
                    <div class="text-sm text-green-500">Online</div>
                </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 p-4 overflow-y-auto">
                <div class="flex justify-end mb-4">
                    <div class="relative bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        Of course. Thank you so much for taking your time.
                    </div>
                </div>
                <div class="flex justify-start mb-4">
                    <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
                        Morning Eten Hunt. I have a question about my job!
                    </div>
                </div>
            </div>

            <!-- Input -->
            <div class="flex box-control-chat items-center">
              <div class="flex w-full h-full">
                <RiLinksLine class="size-6 cursor-pointer text-muted font-medium w-8 hover:text-primary self-center" />
                <textarea
                    @keydown="handleKeyDownBoxFillChat"
                    placeholder="Type your message" class="box-fill-chat text-normal flex-1 h-10 p-2 border rounded mr-2"></textarea>
              </div>
              <div>
                <RiEmojiStickerLine class="size-6 cursor-pointer text-muted font-medium hover:text-primary self-center" />
              </div>
            </div>
        </div>
    </div>
</template>
