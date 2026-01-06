<template>
  <main class="flex h-full w-full flex-col items-center justify-center">
    <div class="w-full max-w-182 flex-1 flex flex-col gap-6 p-6 bg-base-200 rounded-xl border border-base-content/20 overflow-y-scroll overflow-x-hidden">
      <p class="text-lg font-bold">Settings</p>
      <ThemeOption />
      <SteamFormatOption />
      <SteamFolderOption />
      <LocalFolderOption />
    </div>
  </main>
</template>

<script setup lang="ts">
import ThemeOption from '~/components/settings/ThemeOption.vue';
import SteamFormatOption from '~/components/settings/SteamFormatOption.vue';
import SteamFolderOption from '~/components/settings/SteamFolderOption.vue';
import LocalFolderOption from '~/components/settings/LocalFolderOption.vue';
</script>
