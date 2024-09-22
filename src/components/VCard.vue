<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import VBtn from './VBtn.vue';
import {getAvatar, getIsEvenAD, getText, getUserName, textSourceMap} from '@/utils/fetch-data';
import type {TextSource} from '@/utils/fetch-data';

type Props = {
  isRefreshInCd: boolean
}
const props = defineProps<Props>();

const $emits = defineEmits<{
  remove: []
  refresh: []
}>();

/** Show card after all data is loaded. Prevent flashing when loading. */
const isReady = ref(false);

/** Trigger refreshing by modifying this value */
const refreshController = ref(0);

const state = reactive<{
  name: string,
  text: string,
  from: typeof textSourceMap[NonNullable<TextSource>] | null,
  avatar: string,
  ad?: string,
}>({
  name: 'Chuck Norris',
  text: '',
  from: null,
  avatar: '',
});

watch(refreshController, async () => {
  const [avatar, [text, from], name, ad] = await Promise.all([
    getAvatar(),
    getText(),
    getUserName(),
    Math.random() > 0.4 ? getIsEvenAD() : undefined,
  ]);
  Object.assign(state, {
    name: name ?? 'Chuck Norris',
    text,
    from: from && textSourceMap[from],
    avatar,
    ad
  });
  isReady.value = true;
}, {immediate: true});

const refresh = () => {
  if (props.isRefreshInCd) return;
  refreshController.value ^= 1; // 0 -> 1, 1 -> 0
  $emits('refresh');
};

const closeAd = () => {
  state.ad = undefined;
};
</script>

<template>
  <div
    v-if="isReady"
    class="bg-white w-[400px] space-y-2 px-3 pr-4 pt-3 pb-4 rounded-2xl text-black"
  >
    <div class="flex space-x-2">
      <img
        class="shrink-0 size-12 rounded-full outline outline-1"
        :src="state.avatar"
      >
      <div class="grow p-1 rounded-lg text-black font-black">
        <div class="text-gray-700 border-solid border-black border-b mb-2">
          {{ state.name }}
        </div>
        <div>
          {{ state.text }}
        </div>
        <div
          v-if="state.from "
          class="text-right text-xs mt-1"
        >
          From <a
            :href="state.from"
            target="_blank"
          >{{ state.from }}</a>
        </div>
      </div>
    </div>
    <div class="flex justify-end space-x-2">
      <VBtn
        :style="{
          cursor: isRefreshInCd ? 'not-allowed' : undefined
        }"
        :disabled="isRefreshInCd"
        @click="refresh"
      >
        Refresh
      </VBtn>
      <VBtn @click="$emit('remove')">
        Delete
      </VBtn>
    </div>
    <div
      v-if="state.ad"
      class="mt-1"
    >
      <div class="w-fit font-black text-xs rounded-sm outline outline-1 px-1 opacity-80 float-left">
        AD
      </div>
      <VBtn
        class="w-fit font-black text-xs float-right"
        @click="closeAd"
      >
        x
      </VBtn>
      <div class="clear-both text-xs text-black font-black">
        {{ state.ad }}
      </div>
      <div class="text-right text-xs">
        from <a
          href="https://api.isevenapi.xyz"
          target="_blank"
        >"https://api.isevenapi.xyz"</a>
      </div>
    </div>
  </div>
</template>
