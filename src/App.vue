<script setup lang="ts">
import {ref} from 'vue';
import VCard from './components/VCard.vue';
import VHeader from './components/VHeader.vue';
import VBtn from './components/VBtn.vue';
import {genUniqueKey} from './utils/helpers.ts';

const cardItems = ref<{key: string, ref?: InstanceType<typeof VCard>}[]>([
  {key: '1'},
]);

const isRefreshInCd = ref(false);
const timeoutId = ref<ReturnType<typeof setTimeout> | null>(null);

const refreshTimeout = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
    timeoutId.value = null;
  }
  isRefreshInCd.value = true;
  timeoutId.value = setTimeout(() => {
    isRefreshInCd.value = false;
  }, 300);
};

const handleAddingCard = () => {
  if (isRefreshInCd.value) return;
  const key = genUniqueKey(cardItems.value.map(item => item.key));
  cardItems.value.push({key});
  refreshTimeout();
};
const handleRemoveCard = (idx: number) => {
  cardItems.value.splice(idx, 1);
};
</script>

<template>
  <VHeader />
  <main class="flex flex-col-reverse gap-4 items-center py-8">
    <template
      v-for="(item, i) in cardItems"
      :key="item.key"
    >
      <!-- @vue-expect-error -->
      <VCard
        :ref="(el) => item.ref = el"
        :isRefreshInCd="isRefreshInCd"
        @remove="handleRemoveCard(i)"
        @refresh="refreshTimeout()"
      />
    </template>
    <VBtn
      class="aspect-square p-2 pb-3 text-gray-600 text-3xl bg-white"
      :style="{
        'line-height': '1rem',
        cursor: isRefreshInCd ? 'not-allowed' : undefined
      }"
      rounded="rounded-full"
      outline=""
      padding=""
      aria-label="增加卡片"
      :disabled="isRefreshInCd"
      @click="handleAddingCard"
    >
      +
    </VBtn>
  </main>
</template>
