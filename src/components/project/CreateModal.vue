<template>
    <a-modal width="700px" v-model:open="visibleModal" @cancel="handleCancel" :title="null" :footer="null">
      <div class="flex ">
        <div class="relative group">
          <input
              type="file"
              accept="image/*"
              @change="onFileChange"
              ref="fileInput"
              class="hidden"
          />
          <div
              class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
              :style="{ backgroundImage: `url(https://i.pinimg.com/736x/ba/99/39/ba993907e835e4f1c26b3abf8ba29f48.jpg)`, backgroundSize: avatarUrl ? 'cover' : 'none' }"
              @click="triggerFileInput"
          >
            <div class="absolute rounded-full inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <CameraIcon class="text-gray-800 w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="flex gap-2 mb-3">
        <input type="text" class="block bg-transparent text-sm placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-2/3 focus:border-primary" placeholder="Project name">
        <input id="identifier" class="block bg-transparent placeholder-custom-text-400 focus:outline-none rounded-md border-[0.5px] border-custom-border-200 px-3 py-2 w-1/3 text-xs focus:border-blue-400 pr-7" placeholder="Project ID" tabindex="2" type="text" value="" name="identifier">
      </div>
      <textarea id="description" name="description" class="no-scrollbar w-full bg-transparent px-3 py-2 placeholder-custom-text-400 outline-none rounded-md border-[0.5px] border-custom-border-200 !h-24 text-sm focus:border-blue-400" placeholder="Description..." tabindex="3" style="height: 0px;"></textarea>
      <div class="mb-2"></div>
      <Dropdown>
        <template #title>Public</template>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account
            settings</a>
        </MenuItem>
      </Dropdown>
      <div class="flex gap-2 justify-end">
        <button @click="handleCancel" type="button"
                class="inline-flex  justify-center text-gray-500 font-semibold text-sm bg-gray-200 px-3 py-1 rounded-md ">
          Cancel
        </button>
        <button type="button"
                class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-3 py-1 rounded-md hover:bg-primary-hover">
          Add Project
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
const avatarUrl = ref<string>('');
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
  return emit('closeModal', true)
};
const triggerFileInput = () => {
  const fileInput = fileInputRef.value;
  if (fileInput) {
    fileInput.click();
  }
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarUrl.value = e.target?.result;
    };
    reader.readAsDataURL(file);
  }
};

</script>
<style scoped>
.avatar {
  background-position: center;
}
</style>