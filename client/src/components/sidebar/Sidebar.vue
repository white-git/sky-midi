<script setup lang="ts">
import { computed } from 'vue'
import { faPlay, faStop, faFileArrowUp, faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import SidebarAction from './SidebarAction.vue'
import { Common_Provider } from '../../../core/common/Common_Provider'
import { usePlocState } from '../../hooks/usePlocState'

const ploc = Common_Provider.midiPloc
const state = usePlocState(ploc)
const iconPlayStop = computed(() => state.value.listening ? faStop : faPlay)

const toggleListening = () => {
  state.value.listening ? ploc.stopListening() : ploc.startListening()
}

const exportBindings = () => {
  ploc.exportBindings()
}

const importBindings = () => {
  ploc.importBindings()
}
</script>

<template>
  <div class="sidebar fixed w3 h-100 pv3">
    <div class="sidebar__logo flex justify-center mb3">
      <a href="" class="sidebar__logo__img bg-white br-100 ba b--moon-gray"></a>
    </div>

    <ul class="sidebar__list pa2 ma0">
      <li class="flex justify-center mb2">
        <SidebarAction :icon="iconPlayStop" title="play/stop" :disabled="!state.device" @click="toggleListening" />
      </li>

      <li class="flex justify-center mb2">
        <SidebarAction :icon="faFileArrowUp" title="import" :disabled="!state.device" @click="importBindings" />
      </li>

      <li class="flex justify-center mb2">
        <SidebarAction :icon="faFileArrowDown" title="export" :disabled="!state.device" @click="exportBindings" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  &__logo {
    &__img {
      display: block;
      width: 36px;
      height: 36px;
    }
  }
  &__list {
    list-style: none;
  }
}
</style>
