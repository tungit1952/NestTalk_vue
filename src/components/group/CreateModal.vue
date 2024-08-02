<template>
  <a-modal width="680px" v-model:open="visibleModal" @cancel="handleCancel" :title="null" :footer="null">
    <h2 class="text-xl text-primary">THÊM NHÓM</h2>
    <hr>
    <br>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Tên nhóm*:</label>
      </div>
      <input type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary" placeholder="Nhập tên nhóm">
    </div>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Người quản trị nhóm:</label>
      </div>
      <input type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary" placeholder="Chọn người quản trị nhóm">
    </div>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Thành viên:</label>
      </div>
      <Mentions/>
    </div>
    <div class="flex gap-8 mb-3">
      <div class="w-1/3 ">
        <label class="font-medium">Mô tả nhóm:</label>
      </div>
      <textarea id="description" name="description" class="no-scrollbar placeholder-gray-500 w-full border-gray-300 bg-transparent px-3 py-2 placeholder-custom-text-400 outline-none rounded-md border-[0.5px] border-custom-border-200 !h-24 text-sm focus:border-blue-400" placeholder="Mô tả về nhóm này" tabindex="3" style="height: 0px;"></textarea>
    </div>
    <div class="mb-2"></div>
    <div class="flex gap-2 justify-end border-t border-dashed pt-4">
      <button @click="handleCancel" type="button"
              class="inline-flex  justify-center text-gray-500 font-semibold text-sm bg-gray-200 px-3 py-2 rounded-md ">
        Hủy bỏ
      </button>
      <button type="button" class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-3 py-2 rounded-md hover:bg-primary-hover">
        Thêm nhóm mới
      </button>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue';
import Dropdown from "../../components/Dropdown.vue";
import { CameraIcon } from '@heroicons/vue/24/outline'
import {MenuItem} from "@headlessui/vue";
import {eField} from "@/enum/fields";
import Mentions from "@/components/Mentions.vue";

const visibleModal = ref<boolean>(false);
const is_advanced = ref<boolean>(false);
const formData = ref<any>({
  form_id:0,
  type:1,
  label:'',
  description:'',
  is_required:false,
  data:'',
  status:1,
  key:'',
  order:0
});
const titleType = ref<string>('Số nguyên');
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

const emit = defineEmits(["closeModal"])
const handleCancel = () => {
  is_advanced.value = false
  titleType.value = ''
  return emit('closeModal', true)
};
const selectedField = (e) => {
  titleType.value = e.target.getAttribute('label')
  formData.value.type = e.target.getAttribute('value')
}


</script>
<style scoped>
.avatar {
  background-position: center;
}
</style>