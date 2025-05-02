<script setup lang="ts">
import { onMounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Common_Provider } from '../../../core/common/Common_Provider'
import { usePlocState } from '../../hooks/usePlocState'

const ploc = Common_Provider.midiPloc
const state = usePlocState(ploc)

onMounted(() => {
  ploc.getMidiList()
})

const selectDevice = (e: Event) => {
  ploc.setDevice((e.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="midi-selector">
    <label for="device" class="db mb2 f6 b">Device</label>

    <div class="midi-selector__select-wrapper relative">
      <select id="device" name="device" class="midi-selector__select br2 f5 ba ph2 b--moon-gray h2 mw-100 w-100" @change="selectDevice">
        <option value="" v-if="!state.devices.length">No devices</option>
        <option value="" v-if="state.devices.length" :disabled="!!state.device">Select a device</option>
        <option v-for="device in state.devices" :value="device.id">{{ device.name }}</option>
      </select>

      <div class="midi-selector__select__icon absolute">
        <FontAwesomeIcon :icon="faCaretDown" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.midi-selector {
  width: 100%;
  &__select {
    appearance: none;
    &__icon {
      top: 8px;
      right: 8px;
      pointer-events: none;
    }
  }
}
</style>
