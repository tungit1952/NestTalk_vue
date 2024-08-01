<template>
  <div class="bg-white px-3 py-4 border-b-2 flex justify-between">
    <span class="self-center font-medium">QUẢN LÝ NHÓM ĐỀ XUẤT</span>
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
          Trạng thái
        </template>
        <MenuItem class="w-28" v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Tất cả</a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Hoạt động</a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Tạm đóng</a>
        </MenuItem>
      </Dropdown>
      <button @click="showModalCreate" type="button"
              class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-4 py-2 rounded-md hover:bg-primary-hover">
        Thêm nhóm đề xuất +
      </button>
    </div>
    <CreateModal :visible="visibleCreateModal" @closeModal="closeModalCreate"/>
  </div>
  <div class="flex h-[calc(100vh-70px)]">
    <Control/>
    <div class="w-full overflow-y-auto bg-gray-100">
      <div class="bg-white m-3 p-4">
        <h2 class="pb-2 font-bold">PHÒNG KINH DOANH</h2>
        <hr>
        <div class="flex items-center border-b border-gray-200 py-4 justify-between pr-3 ">
          <div class="w-1/2 flex-grow">
            <div class="text-primary font-semibold ml-4">
              Tên nhóm đề xuất
            </div>
          </div>
          <div class="w-1/6 font-semibold  text-primary">
            Quy trình
          </div>
          <div class="w-1/6 font-semibold  text-primary">
            Thời hạn
          </div>
          <div class="text-gray-700 w-1/6 flex justify-end gap-3">
            <div class="font-semibold  text-primary">
              Hành động
            </div>
          </div>
        </div>
        <div v-for="project in projects" :key="project.id" class="flex items-center last:border-0 border-b border-gray-200 py-4 justify-between pr-3">
          <div class="w-1/2 flex">
            <div class="ml-4 flex-grow">
              <div class="flex items-center w-2/3 text-gray-900">
                <span class="overflow-hidden whitespace-nowrap text-ellipsis font-semibold ">   {{ project.name }} </span>
              </div>
              <div class="w-2/3 overflow-hidden whitespace-nowrap text-ellipsis text-gray-600 text-xs">
                {{ project.description }}
              </div>
            </div>
          </div>
          <div class="w-1/6 flex gap-2 text-gray-900">
            <ClipboardDocumentCheckIcon class="w-4 h-4" v-if="project.procedure === 1"/>
            <ClipboardDocumentListIcon class="w-4 h-4" v-else/>
            {{ project.procedure === 1?'Lần lượt':'Đồng thời' }}
          </div>
          <div class="w-1/6 font-semibold  text-gray-900">
            <p class="m-0" v-if="project.sla === null">---</p>
            <p class="m-0" v-else><span class="font-semibold">{{project.sla}}</span>(h)</p>
          </div>
          <div class="text-gray-700 w-1/6 flex justify-end gap-10">
            <div class="flex items-center">
              <a-tooltip>
                <template #title>Đánh dấu</template>
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              </a-tooltip>
            </div>
            <div class="self-center">
              <a-tooltip>
                <template #title>Trạng thái</template>
                <label for="one">
                  <input id="one" type="checkbox" />
                </label>
              </a-tooltip>

            </div>
            <a-tooltip>
              <template #title>Chỉnh sửa</template>
              <router-link to="/form/1">
              <button class="border-2 border-gray-200 hover:bg-gray-200 p-1 rounded-md" type="button">
                <Cog6ToothIcon class="h-5 w-5"/>
              </button>
              </router-link>
            </a-tooltip>
          </div>
        </div>
        <Pagination/>
      </div>
      <div class="bg-white m-3 p-4">
        <h2 class="pb-2 font-bold">PHÒNG KINH DOANH</h2>
        <hr>
        <div class="flex items-center border-b border-gray-200 py-4 justify-between pr-3 ">
          <div class="w-1/2 flex-grow">
            <div class="text-primary font-semibold ml-4">
              Tên nhóm đề xuất
            </div>
          </div>
          <div class="w-1/6 font-semibold  text-primary">
            Quy trình
          </div>
          <div class="w-1/6 font-semibold  text-primary">
            Thời hạn
          </div>
          <div class="text-gray-700 w-1/6 flex justify-end gap-3">
            <div class="font-semibold  text-primary">
              Hành động
            </div>
          </div>
        </div>
        <div v-for="project in projects" :key="project.id" class="flex items-center last:border-0 border-b border-gray-200 py-4 justify-between pr-3">
          <div class="w-1/2 flex">
            <div class="ml-4 flex-grow">
              <div class="flex items-center w-2/3 text-gray-900">
                <span class="overflow-hidden whitespace-nowrap text-ellipsis font-semibold ">   {{ project.name }} </span>
              </div>
              <div class="w-2/3 overflow-hidden whitespace-nowrap text-ellipsis text-gray-600 text-xs">
                {{ project.description }}
              </div>
            </div>
          </div>
          <div class="w-1/6 flex gap-2 text-gray-900">
            <ClipboardDocumentCheckIcon class="w-4 h-4" v-if="project.procedure === 1"/>
            <ClipboardDocumentListIcon class="w-4 h-4" v-else/>
            {{ project.procedure === 1?'Lần lượt':'Đồng thời' }}
          </div>
          <div class="w-1/6 font-semibold  text-gray-900">
            <p class="m-0" v-if="project.sla === null">---</p>
            <p class="m-0" v-else><span class="font-semibold">{{project.sla}}</span>(h)</p>
          </div>
          <div class="text-gray-700 w-1/6 flex justify-end gap-10">
            <div class="flex items-center">
              <a-tooltip>
                <template #title>Đánh dấu</template>
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              </a-tooltip>
            </div>
            <div class="self-center">
              <a-tooltip>
                <template #title>Trạng thái</template>
                <label for="one">
                  <input id="one" type="checkbox" />
                </label>
              </a-tooltip>

            </div>
            <a-tooltip>
              <template #title>Chỉnh sửa</template>
              <button class="border-2 border-gray-200 hover:bg-gray-200 p-1 rounded-md" type="button">
                <Cog6ToothIcon class="h-5 w-5"/>
              </button>
            </a-tooltip>
          </div>
        </div>
        <Pagination/>
      </div>
      <div class="bg-white m-3 p-4">
        <h2 class="pb-2 font-bold">PHÒNG KINH DOANH</h2>
        <hr>
        <div class="flex items-center border-b border-gray-200 py-4 justify-between pr-3 ">
          <div class="w-1/2 flex-grow">
            <div class="text-primary font-semibold ml-4">
              Tên nhóm đề xuất
            </div>
          </div>
          <div class="w-1/6 font-semibold  text-primary">
            Quy trình
          </div>
          <div class="w-1/6 font-semibold  text-primary">
            Thời hạn
          </div>
          <div class="text-gray-700 w-1/6 flex justify-end gap-3">
            <div class="font-semibold  text-primary">
              Hành động
            </div>
          </div>
        </div>
        <div v-for="project in projects" :key="project.id" class="flex items-center last:border-0 border-b border-gray-200 py-4 justify-between pr-3">
          <div class="w-1/2 flex">
            <div class="ml-4 flex-grow">
              <div class="flex items-center w-2/3 text-gray-900">
                <span class="overflow-hidden whitespace-nowrap text-ellipsis font-semibold ">   {{ project.name }} </span>
              </div>
              <div class="w-2/3 overflow-hidden whitespace-nowrap text-ellipsis text-gray-600 text-xs">
                {{ project.description }}
              </div>
            </div>
          </div>
          <div class="w-1/6 flex gap-2 text-gray-900">
            <ClipboardDocumentCheckIcon class="w-4 h-4" v-if="project.procedure === 1"/>
            <ClipboardDocumentListIcon class="w-4 h-4" v-else/>
            {{ project.procedure === 1?'Lần lượt':'Đồng thời' }}
          </div>
          <div class="w-1/6 font-semibold  text-gray-900">
            <p class="m-0" v-if="project.sla === null">---</p>
            <p class="m-0" v-else><span class="font-semibold">{{project.sla}}</span>(h)</p>
          </div>
          <div class="text-gray-700 w-1/6 flex justify-end gap-10">
            <div class="flex items-center">
              <a-tooltip>
                <template #title>Đánh dấu</template>
                <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 22 20">
                  <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
              </a-tooltip>
            </div>
            <div class="self-center">
              <a-tooltip>
                <template #title>Trạng thái</template>
                <label for="one">
                  <input id="one" type="checkbox" />
                </label>
              </a-tooltip>

            </div>
            <a-tooltip>
              <template #title>Chỉnh sửa</template>
              <button class="border-2 border-gray-200 hover:bg-gray-200 p-1 rounded-md" type="button">
                <Cog6ToothIcon class="h-5 w-5"/>
              </button>
            </a-tooltip>
          </div>
        </div>
        <Pagination/>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Dropdown from "../../components/Dropdown.vue";
import CreateModal from "../../components/form/CreateModal.vue";
import Pagination from "../../components/Pagination.vue";
import {StarOutlined, StarFilled, StarTwoTone} from '@ant-design/icons-vue';
import {MenuItem} from "@headlessui/vue";
import {Cog6ToothIcon} from '@heroicons/vue/24/outline'
import {ClockIcon, Squares2X2Icon, SquaresPlusIcon, TableCellsIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon} from '@heroicons/vue/24/outline'
import {ref} from "vue";
import Control from "@/components/form/Control.vue";

const projects = [
  {
    id: 1,
    name: 'Dự án NestBase',
    procedure: 1,
    status: 1,
    sla: null,
    description: 'Mục đích phát triển đề xuất',
    bookmark:true
  },
  {
    id: 2,
    name: 'Dự án NestBase',
    procedure: 1,
    status: 1,
    sla: 24,
    description: 'Mục đích phát triển đề xuất',
    bookmark:true
  },
  {
    id: 3,
    name: 'Dự án NestBase',
    procedure: 2,
    sla: 5,
    description: 'Mục đích phát triển đề xuất',
    bookmark:true
  },
]

const visibleCreateModal = ref<boolean>(false)
const showModalCreate = () => {
  visibleCreateModal.value = true
}
const closeModalCreate = (value: Boolean) => {
  if (value) visibleCreateModal.value = false
}
</script>
