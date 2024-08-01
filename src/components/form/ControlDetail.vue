<template>
  <div class="w-1/6 bg-white border-r">
    <ul class="flex flex-col">
      <li class="flex gap-3 active hover:text-primary cursor-pointer">
        <ComputerDesktopIcon class="w-5 h-5 self-center"/>  <p class="m-0 text-xs text-gray-500 flex flex-col"><span class="text-normal text-gray-900">Thiết lập chung</span>
        Thông tin chung và luồng duyệt
      </p>
      </li>
      <li class="flex gap-3 hover:text-primary cursor-pointer">
        <ClipboardDocumentListIcon class="w-5 h-5 self-center"/> <p class="m-0 text-xs text-gray-500 flex flex-col"><span class="text-normal text-gray-900">Mẫu form đề xuất
      </span>
        Danh sách trường dữ liệu tùy chỉnh</p>
      </li>
      <li class="flex gap-3 hover:text-primary cursor-pointer">
        <PrinterIcon class="w-5 h-5 self-center"/>
        <p class="m-0 text-xs flex flex-col text-gray-500"><span class="text-normal text-gray-900">In mẫu đề xuất</span>
        Tùy chỉnh mẫu in đề xuất
      </p>
      </li>
      <li class="flex gap-3 hover:text-primary cursor-pointer">
        <BellIcon class="w-5 h-5 self-center"/><p class="m-0 text-gray-500 text-xs flex flex-col"> <span class="text-normal text-gray-900">Thông báo</span>
        Thiết lập thông báo nhận được
      </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {BellIcon, PrinterIcon, ComputerDesktopIcon,ClipboardDocumentListIcon, TableCellsIcon} from "@heroicons/vue/24/outline";

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