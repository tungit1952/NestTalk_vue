<template>
  <div class="bg-white pt-4 w-1/2 my-10 h-fit overflow-y-auto mx-auto">
      <div class="flex justify-between pb-4 px-5">
        <div class="flex gap-5">
          <ClipboardDocumentListIcon class="w-8 h-8 self-center" />
          <div>
            <h2 class="font-bold text-xl mb-1">Mẫu form đề xuất</h2>
            <p class="text-sm m-0">Tải file excel để nhập trường dữ liệu tùy chỉnh <span class="text-primary font-bold underline">Tải file</span></p>
          </div>
        </div>
        <button type="button" @click="showModalCreateField"
                class="inline-flex self-center h-9 justify-center text-white font-semibold text-sm bg-primary px-4 py-2 rounded-md hover:bg-primary-hover">
          Thêm nhóm đề xuất +
        </button>
      </div>
    <hr>
    <div>
      <draggable class="m-0" :list="fields" :animation="300" tag="ul">
        <template #item="{ element, index }">
          <div class="border-b flex justify-between last:border-0 px-5 py-3">
            <div class="flex gap-3">
              <Squares2X2Icon class="text-gray-400 w-4 h-4 self-center cursor-grabbing"/>
              <span class="self-center font-medium">{{element.name}}</span>
            </div>
            <div class="flex gap-3">
              <span class="self-center ">Bắt buộc</span>
              <label for="one">
                <input id="one" type="checkbox" />
              </label>
              <span class="px-5 text-gray-900 py-1 bg-amber-100 rounded-sm">Text</span>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    <CreateFieldModal :visible="visibleCreateFieldModal" @closeModalField="closeModalCreateField"/>
  </div>
</template>
<script setup lang="ts">
import {ClipboardDocumentListIcon} from "@heroicons/vue/24/outline";
import {Squares2X2Icon} from "@heroicons/vue/24/solid";
import draggable from 'vuedraggable';
import CreateFieldModal from '../form/CreateFieldModal.vue';
import {ref} from "vue";
import CreateModal from "@/components/form/CreateModal.vue";
const fields = [
  {
    id:1,
    order:1,
    name:'Họ và tên',
    required:true,
    type:1
  },
  {
    id:2,
    order:2,
    name:'Ngày tháng năm sinh',
    required:false,
    type:2
  },
  {
    id:3,
    order:3,
    name:'Tiểu sử',
    required:true,
    type:1
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