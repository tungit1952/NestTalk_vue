<template>
  <div class="w-1/6 bg-white border-r">
    <ul class="flex flex-col">
      <li class="flex gap-3 active hover:text-primary cursor-pointer">
        <Squares2X2Icon class="w-5 h-5 self-center"/>  <p class="m-0 text-xs text-gray-500 flex flex-col"><span class="text-normal text-gray-900">Tất cả nhóm đề xuất</span>
        Danh sách tất cả nhóm đề xuất
      </p>
      </li>
      <li @click="showAlertWait" class="flex gap-3 hover:text-primary cursor-pointer">
        <SquaresPlusIcon class="w-5 h-5 self-center"/> <p class="m-0 text-xs text-gray-500 flex flex-col"><span class="text-normal text-gray-900">Tạo nhóm đề xuất từ mẫu</span>
        Có thể tạo nhóm đề xuất qua mẫu</p>
      </li>
      <li @click="showAlertWait" class="flex gap-3 hover:text-primary cursor-pointer">
        <TableCellsIcon class="w-5 h-5 self-center"/>
        <p class="m-0 text-xs flex flex-col text-gray-500"><span class="text-normal text-gray-900">Tạo nhóm đề xuất từ file</span>
        Có thể import excel để tạo nhóm đề xuất
      </p>
      </li>
      <li @click="showAlertWait" class="flex gap-3 hover:text-primary cursor-pointer">
        <ClockIcon class="w-5 h-5 self-center"/><p class="m-0 text-gray-500 text-xs flex flex-col"> <span class="text-normal text-gray-900">Lịch sử chỉnh sửa</span>
        Lịch sử chỉnh sửa do hệ thống ghi nhận
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {ClockIcon, Squares2X2Icon, SquaresPlusIcon, TableCellsIcon} from "@heroicons/vue/24/outline";

const showAlertWait = () => {
  alert('Chức năng sẽ được cập nhật sắp tới')
}
</script>
<style scoped>
li{
  padding: 1rem;
}
li.active{
  background: #195bb024;
  color: #195bb0 !important;
  border-right: 1px solid #195bb0;
}

li.active span{
  color: #195bb0 !important;
}
li.active p{
  color: #195bb0 !important;
}
li:hover span{
  color: #195bb0;
}
li:hover p{
  color: #195bb0;
}
</style>