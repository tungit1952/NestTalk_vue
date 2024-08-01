<template>
  <div class="bg-white gap-2 px-3 py-4 border-b-2">
    <span class="self-center font-medium">Dự án NestBase</span>
    <p class="m-0 pt-1 text-xs text-gray-500">Mục đích phát triển đề xuất</p>
  </div>
  <div class="flex h-[calc(100vh-70px)] ">
    <ControlDetail/>
<!--    <Field />-->
    <Detail/>
  </div>
</template>
<script setup lang="ts">
import {MenuItem} from "@headlessui/vue/dist";
import ControlDetail from "@/components/form/ControlDetail.vue";
import Field from "@/components/form/Field.vue";
import Detail from "@/components/form/Detail.vue";
</script>