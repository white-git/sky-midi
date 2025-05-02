<script setup lang="ts">
import { Common_Provider } from '../../../core/common/Common_Provider'
import { usePlocState } from '../../hooks/usePlocState'

const ploc = Common_Provider.midiPloc
const state = usePlocState(ploc)
</script>

<template>
  <div class="device-info f7">
    <div class="device-info__empty bg-white dark-gray br2 pa2 ma0 ba b--moon-gray" v-if="!state.device">
      <span>No device selected</span>
    </div>

    <ul class="device-info__list bg-white dark-gray br2 pa2 ma0 ba b--moon-gray" v-if="state.device">
      <li class="device-info__field mb1">id: <span class="b">{{ state.device.id }}</span></li>
      <li class="device-info__field mb1">manufacturer: <span class="b">{{ state.device.manufacturer }}</span></li>
      <li class="device-info__field mb1">name: <span class="b">{{ state.device.name }}</span></li>
      <li class="device-info__field">version: <span class="b">{{ state.device.version }}</span></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.device-info {
  &__list {
    list-style: none;
  }
}
</style>
