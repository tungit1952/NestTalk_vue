<template>
    <a-modal width="800px" v-model:open="visibleModal" @cancel="handleCancel" :title="null" :footer="null">
      <h2 class="text-xl text-primary">Thêm nhóm đề xuất mới</h2>
      <hr>
      <br>
      <div class="flex gap-10 mb-3">
        <div class="w-1/3 ">
          <label class="font-medium">Tên nhóm đề xuất*:</label>
          <p class="text-gray-500 tracking-tight text-xs">Tên nhóm đề xuất</p>
        </div>
        <input v-model="formData.name" type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary" placeholder="Tên nhóm đề xuất">
      </div>
      <div class="flex gap-10 mb-3">
        <div class="w-1/3 ">
          <label class="font-medium">Người xét duyệt:</label>
          <p class="text-gray-500 tracking-tight text-xs">Một đề xuất chỉ được xét duyệt nếu tất cả thành viên đồng ý.</p>
        </div>
        <Mentions/>

      </div>
      <div class="flex gap-10 mb-3">
        <div class="w-1/3 ">
          <label class="font-medium break-words">Quy trình xử lý:</label>
          <p class="tracking-tight text-xs text-gray-500">Lựa chọn xử lý đề xuất đồng thời hoặc xử lý lần lượt.</p>
        </div>
        <Dropdown class="w-full justify-end h-10">
          <template class="font-bold" #title>
            <span>Xử lý lần lượt</span>
          </template>
          <MenuItem class="w-36" v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Không</a>
          </MenuItem>
          <MenuItem class="w-36" v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Có</a>
          </MenuItem>
        </Dropdown>
      </div>
      <div class="flex gap-10 mb-3">
        <div class="w-1/3 ">
          <label class="font-medium break-words">Yêu cầu thông báo tới quản lý trực tiếp:</label>
          <p class="tracking-tight text-xs text-gray-500">Nếu chọn có, mọi đề xuất sẽ được thông báo tới quản lý trực tiếp của người tạo đề xuất.</p>
        </div>
        <Dropdown class="w-full justify-end h-10">
          <template class="font-bold" #title>
            <span>Không</span>
          </template>
          <MenuItem class="w-36" v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Không</a>
          </MenuItem>
          <MenuItem class="w-36" v-slot="{ active }">
            <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Có</a>
          </MenuItem>
        </Dropdown>
      </div>
      <div v-if="!is_advanced" class="flex justify-center w-full">
        <button @click="() => {is_advanced = !is_advanced}" type="button"
                class="inline-flex  justify-center text-primary font-semibold text-sm bg-gray-100 px-3 py-2 rounded-md ">
          Thêm tùy chọn nâng cao +
        </button>
      </div>
      <div v-if="is_advanced">
        <div class="flex gap-10 mb-3">
          <div class="w-1/3 ">
            <label class="font-medium">Category:</label>
            <p class="text-gray-500 tracking-tight text-xs">Phân loại nhóm.</p>
          </div>
          <input v-model="formData.category" type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary"
                 placeholder="Phân loại (ví dụ: Phòng KD, Phòng kế toán">
        </div>
        <div class="flex gap-10 mb-3">
          <div class="w-1/3 ">
            <label class="font-medium">Thời hạn (SLA):</label>
            <p class="text-gray-500 tracking-tight text-xs">Số giờ quy định để xử lý đề xuất này. Để trống nếu bạn không có yêu cầu cụ thể.</p>
          </div>
          <input v-model="formData.sla" type="number" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary"
                 placeholder="Vui lòng điền số giờ tối đa quy định để hoàn thành xử lý đề xuất này.">
        </div>
        <div class="flex gap-10 mb-3">
          <div class="w-1/3 ">
            <label class="font-medium">Sử dụng cho:</label>
            <p class="text-gray-500 tracking-tight text-xs">Nhóm-bộ phận chức năng có thể tạo đề xuất.</p>
          </div>
          <input v-model="formData.group_id" type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary"
                 placeholder="Vui lòng điền số giờ tối đa quy định để hoàn thành xử lý đề xuất này.">
        </div>
        <div class="flex gap-10 mb-3">
          <div class="w-1/3 ">
            <label class="font-medium">Người theo dõi:</label>
            <p class="text-gray-500 tracking-tight text-xs">Thành viên không trực tiếp xử lý đề xuất nhưng có thể theo dõi và trích xuất đề xuất.</p>
          </div>
          <input type="text" class="block border-gray-300  placeholder-gray-500 bg-transparent h-10 text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-full focus:border-primary"
                 placeholder="Vui lòng điền số giờ tối đa quy định để hoàn thành xử lý đề xuất này.">
        </div>
        <div class="flex gap-10 mb-3">
          <div class="w-1/3 ">
            <label class="font-medium">Mô tả nhóm đề xuất:</label>
            <p class="text-gray-500 tracking-tight text-xs">Mô tả nhóm đề xuất này</p>
          </div>
          <textarea id="description" name="description" class="no-scrollbar placeholder-gray-500 w-full border-gray-300 bg-transparent px-3 py-2 placeholder-custom-text-400 outline-none rounded-md border-[0.5px] border-custom-border-200 !h-24 text-sm focus:border-blue-400" placeholder="Mô tả về nhóm đề xuất này" tabindex="3" style="height: 0px;"></textarea>
        </div>
      </div>

      <div class="mb-2"></div>
      <div class="flex gap-2 justify-end border-t border-dashed pt-4">
        <button @click="handleCancel" type="button"
                class="inline-flex  justify-center text-gray-500 font-semibold text-sm bg-gray-200 px-3 py-2 rounded-md ">
          Hủy bỏ
        </button>
        <button type="button" class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-3 py-2 rounded-md hover:bg-primary-hover">
          Tạo nhóm đề xuất
        </button>
      </div>
    </a-modal>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue';
import Dropdown from "../../components/Dropdown.vue";
import { CameraIcon } from '@heroicons/vue/24/outline'
import {MenuItem} from "@headlessui/vue";
import Mentions from "@/components/Mentions.vue";
const visibleModal = ref<boolean>(false);
const is_advanced = ref<boolean>(false);
const fileInputRef = ref<HTMLInputElement | null>(null);
const formData = ref<any>({
  name:'',
  is_notify_manager:0,
  procedure:1,
  is_advanced:0,
  category:'',
  group_id:0,
  approver:[],
  watcher:[],
  sla:null,
  description:'',
  status:0,
})
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
  return emit('closeModal', true)
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