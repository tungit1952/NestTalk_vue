<template>
  <a-modal width="680px" v-model:open="visibleModal" @cancel="handleCancel" :title="null" :footer="null">
    <h2 class="text-xl text-primary">THÊM TRƯỜNG DỮ LIỆU</h2>
    <hr>
    <br>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Loại dữ liệu đầu vào*:</label>
      </div>
      <Dropdown class="w-full justify-end h-10">
        <template class="font-bold" #title>
          <span>Số nguyên</span>
        </template>
        <MenuItem class="w-36" v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Không</a>
        </MenuItem>
        <MenuItem class="w-36" v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Có</a>
        </MenuItem>
      </Dropdown>
    </div>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Tên trường dữ liệu*</label>
      </div>
      <input type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary" placeholder="Nhập tên trường dữ liệu">
    </div>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Mô tả trường dữ liệu:</label>
      </div>
      <textarea id="description" name="description" class="no-scrollbar placeholder-gray-500 w-full border-gray-300 bg-transparent px-3 py-2 placeholder-custom-text-400 outline-none rounded-md border-[0.5px] border-custom-border-200 !h-24 text-sm focus:border-blue-400" placeholder="Giải thích thêm (không bắt buộc)" tabindex="3" style="height: 0px;"></textarea>
    </div>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Bắt buộc trả lời?:</label>
      </div>
      <Dropdown class="w-full justify-end h-10">
        <template class="font-bold" #title>
          <span>Không, không bắt buộc</span>
        </template>
        <MenuItem class="w-36" v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Không</a>
        </MenuItem>
        <MenuItem class="w-36" v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Có</a>
        </MenuItem>
      </Dropdown>
    </div>
    <div class="mb-2"></div>
    <div class="flex gap-2 justify-end border-t border-dashed pt-4">
      <button @click="handleCancel" type="button"
              class="inline-flex  justify-center text-gray-500 font-semibold text-sm bg-gray-200 px-3 py-2 rounded-md ">
        Hủy bỏ
      </button>
      <button type="button" class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-3 py-2 rounded-md hover:bg-primary-hover">
        Thêm trường mới
      </button>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue';
import Dropdown from "../../components/Dropdown.vue";
import { CameraIcon } from '@heroicons/vue/24/outline'
import {MenuItem} from "@headlessui/vue";
const visibleModal = ref<boolean>(false);
const is_advanced = ref<boolean>(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  }
})
watch(
    () => props.visible,
    () => {
      visibleModal.value = props.visible
    }
)

const emit = defineEmits(["closeModalField"])
const handleCancel = () => {
  is_advanced.value = false
  return emit('closeModalField', true)
};
const triggerFileInput = () => {
  const fileInput = fileInputRef.value;
  if (fileInput) {
    fileInput.click();
  }
};


</script>
<style scoped>
.avatar {
  background-position: center;
}
</style>