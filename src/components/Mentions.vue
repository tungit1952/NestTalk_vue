<template>
  <div class="relative w-full">
    <input
        type="text"
        v-model="inputValue"
        @input="onInput"
        @keydown.down.prevent="navigate(1)"
        @keydown.up.prevent="navigate(-1)"
        @keydown.enter.prevent="selectUser(null)"
        class="block border-gray-300 placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none w-full rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 focus:border-primary"
        placeholder="Tên nhóm đề xuất"
    />
    <ul
        v-if="showSuggestions"
        class="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md shadow-lg w-full"
    >
      <li
          v-for="(user, index) in filteredUsers"
          :key="user.id"
          :class="{
          'bg-primary text-white': index === selectedIndex,
          'hover:bg-gray-200': index !== selectedIndex
        }"
          class="px-3 py-2 cursor-pointer"
          @click="selectUser(user)"
      >
        {{ user.value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const users = [
  { id: 1, value: 'tungnt' },
  { id: 2, value: 'dongtn' },
  { id: 3, value: 'linhnh' },
]

const inputValue = ref('')
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

const filteredUsers = computed(() => {
  const match = inputValue.value.match(/@(\w{1,})$/)
  if (match) {
    const query = match[1].toLowerCase()
    return users.filter(user =>
        user.value.toLowerCase().includes(query)
    )
  }
  return []
})

function onInput() {
  showSuggestions.value = filteredUsers.value.length > 0
  selectedIndex.value = -1
}
let index = 0
function navigate(direction: number) {
  if (showSuggestions.value && filteredUsers.value.length > 0) {
    const maxIndex = filteredUsers.value.length - 1
    selectedIndex.value += direction

    if (selectedIndex.value > maxIndex) {
      selectedIndex.value = 0
    } else if (selectedIndex.value < 0) {
      selectedIndex.value = maxIndex
    }
  }
}

function selectUser(user: any = null) {
  console.log(user)
  console.log(selectedIndex.value)
  if (!user && selectedIndex.value !== -1) {
    user = filteredUsers.value[selectedIndex.value]
    console.log(selectedIndex.value)
  }
  if (user) {
    inputValue.value = inputValue.value.replace(/@\w*$/, `@${user.value} `)
    showSuggestions.value = false
  }
}
</script>

<style scoped>
</style>
