<script setup lang="ts">

type Props = {
  text?: string,
  padding?: string,
  rounded?: string,
  outline?: string,
  overflow?: string,
}
withDefaults(defineProps<Props>(), {
  padding: 'px-2',
  rounded: 'rounded-lg',
  outline: 'outline outline-1',
  overflow: 'overflow-hidden'
});

</script>

<template>
  <button
    :class="[
      'relative',
      padding,
      rounded,
      outline,
      overflow,
    ]"
    type="button"
  >
    <div class="absolute inset-0 bg-current opacity-0 hover:opacity-10" />
    <slot>
      {{ text }}
    </slot>
  </button>
</template>
