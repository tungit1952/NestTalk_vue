<template>
  <div class="border-gray-100 flex gap-3 pl-3 w-full mt-3 overflow-y-auto justify-center">
    <div class="w-3/5">
      <div class="bg-white pt-4 ">
        <div class="flex justify-between pb-4 px-5">
          <div class="flex gap-5">
            <ComputerDesktopIcon class="w-8 h-8 self-center" />
            <div>
              <h2 class="font-bold text-xl mb-1">Thông tin chung</h2>
              <p class="text-sm m-0">Thiết lập các thông tin chung về nhóm đề xuất</p>
            </div>
          </div>
          <button type="button" @click="showModalCreateField"
                  class="inline-flex self-center h-9 justify-center text-white font-semibold text-sm bg-primary px-4 py-2 rounded-md hover:bg-primary-hover">
            Chỉnh sửa
          </button>
        </div>
        <hr>
        <div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Tên nhóm đề xuất</span>
            <span class="self-center">Dự án NestBase</span>
          </div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Tạo bởi</span>
            <span class="self-center">Nguyễn Thanh Tùng</span>
          </div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Phân loại</span>
            <span class="self-center">Masscom</span>
          </div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Thời gian (SLA)</span>
            <span class="self-center">24 giờ</span>
          </div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Sử dụng cho</span>
            <span class="self-center">Toàn công ty</span>
          </div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Mô tả đề xuất</span>
            <span class="self-center">Dự án vận hành cho Masscom</span>
          </div>
          <div class="border-b flex justify-between last:border-0 px-5 py-4">
            <span class="self-center font-medium">Trạng thái</span>
            <span class="self-center text-green-600">Hoạt động</span>
          </div>
        </div>
        <CreateFieldModal :visible="visibleCreateFieldModal" @closeModalField="closeModalCreateField"/>
      </div>
      <br>
      <div class="bg-white pt-4 h-fit ">
        <div class="flex justify-between pb-4 px-5">
          <div class="flex gap-5">
            <UsersIcon class="w-8 h-8 self-center" />
            <div>
              <h2 class="font-bold mb-1 text-xl">Người duyệt</h2>
              <p class="text-sm m-0">Danh sách các khối người duyệt theo thứ tự của nhóm đề xuất</p>
            </div>
          </div>
          <button type="button" @click="showModalCreateField"
                  class="inline-flex self-center h-9 justify-center text-white font-semibold text-sm bg-primary px-4 py-2 rounded-md hover:bg-primary-hover">
            Thêm +
          </button>
        </div>
        <hr>
        <div>
          <draggable class="m-0" :list="approvers" :animation="300" tag="ul">
            <template #item="{ element, index }">
              <div class="p-4 gap-3 flex items-center border-b last:border-0 cursor-pointer hover:bg-blue-50 rounded-md">
                <Squares2X2Icon class="text-gray-400 w-5 h-5 self-center cursor-grabbing"/>
                <img src="/src/assets/images/luffy_avatar.jpg" alt="User" class="w-11 h-11 rounded-full">
                <div>
                  <div class="font-medium pb-1">{{element.name}}</div>
                  <div class="text-xs text-gray-500"><span class="font-medium">@{{element.username}}</span> - {{element.role}}</div>
                </div>
              </div>
            </template>
          </draggable>
        </div>
        <CreateFieldModal :visible="visibleCreateFieldModal" @closeModalField="closeModalCreateField"/>
      </div>
    </div>
    <div class="bg-white h-1/5 pt-4 w-2/5 mr-5">
      <div class="flex justify-between pb-4 px-5">
        <div class="flex gap-5">
          <ShareIcon class="w-7 h-7 self-center" />
          <div>
            <h2 class="font-bold mb-1 text-xl">Luồng duyệt</h2>
            <p class="text-sm m-0">Thiết lập luồng duyệt đề xuất</p>
          </div>
        </div>
      </div>
      <hr>
      <div class="flex px-5 gap-1 mt-4 mb-3">
        <div class="w-1/3 self-center">
          <label class="font-medium">Luồng duyệt:</label>
        </div>
        <Dropdown class="w-full justify-end h-10">
          <template class="font-bold" #title>
            <span>Lần lượt</span>
          </template>
          <MenuItem class="w-36" v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Không</a>
          </MenuItem>
          <MenuItem class="w-36" v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Có</a>
          </MenuItem>
        </Dropdown>
      </div>
      <CreateFieldModal :visible="visibleCreateFieldModal" @closeModalField="closeModalCreateField"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ComputerDesktopIcon, UsersIcon, ShareIcon} from "@heroicons/vue/24/outline";
import {Squares2X2Icon} from "@heroicons/vue/24/solid";
import CreateFieldModal from '../form/CreateFieldModal.vue';
import {ref} from "vue";
import draggable from 'vuedraggable';
import CreateModal from "@/components/form/CreateModal.vue";
import Dropdown from "@/components/Dropdown.vue";
import {MenuItem} from "@headlessui/vue";
const approvers = [
  {
    id:1,
    order:1,
    name:'Nguyễn Thanh Tùng',
    username:'thanhtung200ng',
    role:'Thợ code thiện lành'
  },
  {
    id:2,
    order:2,
    name:'Tiến Bịp',
    username:'tienbip_hp',
    role:'Dân chơi'
  },
  {
    id:3,
    order:3,
    name:'DJ Thái Hoàng',
    username:'nonstoptrutinh',
    role:'DJ đám cưới'
  },

]
const visibleCreateFieldModal = ref<boolean>(false)
const showModalCreateField = () => {
  visibleCreateFieldModal.value = true
}
const closeModalCreateField = (value: Boolean) => {
  if (value) visibleCreateFieldModal.value = false
}
</script>