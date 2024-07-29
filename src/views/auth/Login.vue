<template>
  <div
      class="flex flex-col bg-white shadow-md  px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-3/4 max-w-md">
    <div class="my-1 w-full flex justify-center">
      <img width="180px" src="/src/assets/images/logo.png" alt="logo">
    </div>

    <div class="mt-4 self-center text-xl sm:text-sm text-gray-800">
      Enter your credentials to access your account
    </div>

    <div class="mt-10">
      <form action="#">
        <div class="flex flex-col mb-5">
          <label
              for="email"
              class="mb-1 text-xs tracking-wide text-gray-600"
          >E-Mail Address:</label
          >
          <div class="relative">
            <div
                class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
            >
              <i class="fas fa-at text-blue-500"></i>
            </div>

            <input
                @keydown.enter="submitLogin"
                id="email"
                type="email"
                name="email"
                v-model="formLogin.email"
                class="
                    text-sm
                    placeholder-gray-500
                    pl-6
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-primary
                  "
                placeholder="Enter your email"
            />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <label
              for="password"
              class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >Password:</label
          >
          <div class="relative">
            <div
                class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
            >
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
            </div>

            <input
                @keydown.enter="submitLogin"
                id="password"
                type="password"
                name="password"
                v-model="formLogin.password"
                class="text-sm placeholder-gray-500 pl-6 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-primary"
                placeholder="Enter your password"
            />
          </div>
        </div>

        <div class="flex w-full">
          <button
              @keydown.enter="submitLogin"
              @click="submitLogin"
              type="button"
              class="flex  mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary
                  hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
          >
            <span class="mr-2 uppercase">Sign In</span>
            <span>
                  <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="flex justify-center items-center mt-6">
    <a href="#" target="_blank" class="inline-flex items-center text-gray-700 font-medium text-xs text-center">
          <span class="ml-2">You don't have an account?
            <a href="#" class="text-xs ml-2 text-blue-500 font-semibold">I don't care</a></span>
    </a>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
const router = useRouter();
const userStore = useUserStore();

const formLogin = ref({
  email:'',
  password:''
})
const submitLogin = async () => {
    const response = await userStore.login(formLogin.value)
    if(response){
      router.push({name:'Home'})
    }
}
</script>