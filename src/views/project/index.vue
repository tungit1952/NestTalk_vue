<template>
  <div class="bg-white px-3 py-4 border-b-2 flex justify-between">
    <span class="self-center">Project</span>
    <div class="flex gap-4">
      <div class="relative text-gray-600 rounded-md" style="border:solid 1px #d1d5db">
        <input type="search" name="serch" placeholder="Search"
               class="bg-white px-5 h-full pr-10 rounded-full text-sm focus:outline-none">
        <button type="submit" class="absolute right-0 top-0 mt-2 mr-4">
          <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
               viewBox="0 0 56.966 56.966"  xml:space="preserve"
               width="512px" height="512px">
      <path
          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
    </svg>
        </button>
      </div>
      <Dropdown>
        <template #title>
          Filter
        </template>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Account
            settings</a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">License</a>
        </MenuItem>
        <form method="POST" action="#">
          <MenuItem v-slot="{ active }">
            <button type="submit"
                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm']">
              Sign out
            </button>
          </MenuItem>
        </form>
      </Dropdown>
      <button type="button"
              class="inline-flex  justify-center text-white font-semibold text-sm bg-primary px-4 py-2 rounded-md hover:bg-primary-hover">
        Add Project
      </button>
    </div>
  </div>
  <div class="bg-white p-4">
    <div v-for="project in projects" :key="project.id" class="flex items-center border-b border-gray-200 py-4 justify-between pr-3">
      <div class="flex">
        <div class="flex-shrink-0">
          <div class="bg-gray-200 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold">
            {{ project.initials }}
          </div>
        </div>
        <div class="ml-4 flex-grow">
          <div class="flex items-center font-semibold text-gray-900">
            {{ project.name }} / {{ project.repo }}
            <span v-if="project.role" class="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">{{ project.role }}</span>
          </div>
          <div class="text-gray-600 text-sm">
            {{ project.description }}
          </div>
          <div class="text-gray-500 text-xs">
            Updated {{ project.updated }}
          </div>
        </div>
      </div>
      <div class="text-gray-700 flex items-center gap-3">
        <div class="flex items-center">
          <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>
        </div>
        <button class="border-2 border-gray-200 hover:bg-gray-200 p-1 rounded-md" type="button">
          <LinkIcon class="h-5 w-5" />
        </button>
        <button class="border-2 border-gray-200 hover:bg-gray-200 p-1 rounded-md" type="button">
          <Cog6ToothIcon class="h-5 w-5" />
        </button>

      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import Dropdown from "../../components/Dropdown.vue";
import {MenuItem} from "@headlessui/vue";
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { LinkIcon } from '@heroicons/vue/24/outline'
const projects = [
  {
    id: 1,
    initials: 'Z',
    name: 'Dự án NestBase',
    repo: 'nestbase-317',
    role: 'Public',
    description: '',
    updated: 'Dự án phát triển giải pháp quản lý công việc theo team, tối ưu thời gian...'
  },
  {
    id: 1,
    initials: 'Z',
    name: 'Dự án NestBase',
    repo: 'nestbase-317',
    role: 'Public',
    description: '',
    updated: 'Dự án phát triển giải pháp quản lý công việc theo team, tối ưu thời gian...'
  },
  {
    id: 1,
    initials: 'Z',
    name: 'Dự án NestBase',
    repo: 'nestbase-317',
    role: 'Public',
    description: '',
    updated: 'Dự án phát triển giải pháp quản lý công việc theo team, tối ưu thời gian...'
  },
]
</script>
