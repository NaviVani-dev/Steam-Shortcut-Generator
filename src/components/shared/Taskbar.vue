<script setup lang="ts">
import SteamIcon from "~/components/shared/SteamIcon.vue";
import { Library, Gamepad2, SquarePen, Bolt } from 'lucide-vue-next'
</script>

<template>
<div class="flex flex-row shrink-0 w-full max-w-182 items-center justify-center overflow-hidden px-1 py-2 gap-2 h-12 bg-base-200 rounded-xl border border-base-content/20">
  <button
    @click="$router.push('/')"
    :class="$route.fullPath == '/' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
    class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
  >
    <Library :size="16" />
    <p class="anim-all" :class="$route.fullPath == '/' ? 'text-xs' : 'text-[0px] -m-0.5'">Library</p>
  </button>

  <button
    @click="$router.push('/browser')"
    :class="$route.fullPath == '/browser' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
    class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
  >
    <SteamIcon />
    <p class="anim-all" :class="$route.fullPath == '/browser' ? 'text-xs' : 'text-[0px] -m-0.5'">Add Steam Games</p>
  </button>

  <button
    @click="$router.push('/local')"
    :class="$route.fullPath == '/local' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
    class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
  >
    <Gamepad2 :size="16" />
    <p class="anim-all" :class="$route.fullPath == '/local' ? 'text-xs' : 'text-[0px] -m-0.5'">Add Local Games</p>
  </button>

  <button
    @click="$router.push('/editor')"
    :class="$route.fullPath == '/editor' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
    class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
  >
    <SquarePen :size="16" />
    <p class="anim-all" :class="$route.fullPath == '/editor' ? 'text-xs' : 'text-[0px] -m-0.5'">Manual Editor</p>
  </button>

  <button
    @click="$router.push('/settings')"
    :class="$route.fullPath == '/settings' ? 'bg-accent hover:bg-accent/80 text-accent-content px-3' : 'bg-transparent hover:bg-base-300 text-base-content/50 px-2'"
    class="h-full rounded-full text-xs anim-all w-auto whitespace-nowrap flex flex-row gap-1 items-center cursor-pointer"
  >
    <Bolt :size="16" />
    <p class="anim-all" :class="$route.fullPath == '/settings' ? 'text-xs' : 'text-[0px] -m-0.5'">Settings</p>
  </button>
</div>
</template>
