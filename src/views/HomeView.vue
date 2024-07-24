<script setup lang="ts">

</script>

<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-1/4 bg-white border-r">
            <div class="p-4 border-b">
                <input type="text" placeholder="Search in dashboard..." class="w-full p-2 border rounded">
            </div>
            <div class="overflow-y-auto h-full pt-4 px-4">
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
                <img src="/src/assets/icons/message.svg" alt="User" class="w-10 h-10 rounded-full mr-2">
                <div>
                    <div class="font-bold">Eten Hunt</div>
                    <div class="text-sm text-green-500">Online</div>
                </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 p-4 overflow-y-auto">
                <div class="flex justify-end mb-4">
                    <div class="bg-blue-500 text-white p-3 rounded-lg max-w-xs">
                        Of course. Thank you so much for taking your time.
                    </div>
                </div>
                <div class="flex justify-start mb-4">
                    <div class="bg-gray-100 p-3 rounded-lg max-w-xs">
                        Morning Eten Hunt. I have a question about my job!
                    </div>
                </div>
                <!-- Repeat for other messages -->
            </div>

            <!-- Input -->
            <div class="p-4 border-t flex items-center">
                <input type="text" placeholder="Type your message" class="flex-1 p-2 border rounded mr-2">
                <button class="bg-blue-500 text-white p-2 rounded-full">
                    <!-- Icon or Text -->
                    Send
                </button>
            </div>
        </div>
    </div>
</template>
