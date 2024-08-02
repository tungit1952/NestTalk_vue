<template>
  <div class="bg-white px-3 py-4 border-b-2 flex justify-between">
    <span class="self-center font-medium">QUẢN LÝ NHÓM</span>
    <div class="flex gap-4">
      <div class="relative text-gray-600 rounded-md" style="border:solid 1px #d1d5db">
        <input type="search" name="serch" placeholder="Tìm kiếm theo tên "
               class="bg-white px-5 h-full pr-10 rounded-full text-sm focus:outline-none">
        <button type="submit" class="absolute right-0 top-0 mt-2 mr-4">
          <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
               viewBox="0 0 56.966 56.966" xml:space="preserve"
               width="512px" height="512px">
      <path
          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
    </svg>
        </button>
      </div>
      <Dropdown>
        <template #title>
          Tất cả nhóm
        </template>
        <MenuItem class="w-28" v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Tất cả nhóm</a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Nhóm của tôi</a>
        </MenuItem>
      </Dropdown>
      <button @click="showModalCreate" type="button"
              class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-4 py-2 rounded-md hover:bg-primary-hover">
        Thêm nhóm +
      </button>
    </div>
  </div>
  <div class="flex h-[calc(100vh-70px)]">
    <div class="w-full overflow-y-auto bg-gray-100">
      <div class="bg-white m-3 p-4">
        <h2 class="pb-2 font-medium">Danh sách nhóm</h2>
        <hr>
        <div v-for="group in groups" :key="group.id" class="flex items-center last:border-0 border-b border-gray-200 py-4 gap-4 pr-3">
          <a-avatar :size="{ xs: 24, sm: 32, md: 40, lg: 60, xl: 60, xxl: 60 }" class="bg-gray-400" :style="{ verticalAlign: 'middle' }" >
            K
          </a-avatar>
          <div>
            <div>
              <span class="self-center font-medium">{{group.name}}</span>
              <p class="mb-0 mt-2"><span class="font-medium">@{{group.username}}</span> - {{group.description}}</p>
              <p class="mb-0 mt-2 text-xs"><span class="font-medium">Owner:</span> Tùng xèng - <span class="font-medium">Ngày tạo:</span> 19/5/2000</p>
            </div>
          </div>

        </div>
        <Pagination/>
      </div>
    </div>
  </div>
  <CreateModal :visible="visibleCreateModal" @closeModal="closeModalCreate"/>
</template>
<script setup lang="ts">
import {MenuItem} from "@headlessui/vue";
import Dropdown from "@/components/Dropdown.vue";
import Pagination from "@/components/Pagination.vue";
import {ref} from "vue";
import CreateModal from "@/components/group/CreateModal.vue";

const groups = [
  {
    id:1,
    name:'Khối công nghệ',
    username:'kcn',
    description:'Công nghệ là không ngừng phát triển',
    leader:1,
    count_member:4
  },
  {
    id:2,
    name:'Nhóm du kích',
    username:'ndk',
    description:'Toàn ngợm',
    leader:2,
    count_member:10
  }
]
const visibleCreateModal = ref<boolean>(false)
const showModalCreate = () => {
  visibleCreateModal.value = true
}

const closeModalCreate = (value: Boolean) => {
  if (value) visibleCreateModal.value = false
}

</script>