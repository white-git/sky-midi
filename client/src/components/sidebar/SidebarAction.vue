<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const props = defineProps<{
  icon: IconDefinition,
  title: string,
  disabled?: boolean,
}>()

const emit = defineEmits(['click'])

const click = () => {
  emit('click')
}
</script>

<template>
  <button class="sidebar__action bg-white dark-gray br2 ba b--moon-gray" :disabled="props.disabled" :title="props.title" @click="click">
    <FontAwesomeIcon :icon="props.icon" size="sm" class="mt1" />
  </button>
</template>

<style scoped lang="scss">
.sidebar {
  &__action {
    width: 36px;
    height: 36px;
    transition: .1s ease-in-out all;
    &[disabled] {
      color: var(--gray);
      background-color: var(--moon-gray);
    }
    &:not([disabled]) {
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
