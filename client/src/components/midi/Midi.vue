<script setup lang="ts">
import DeviceSelector from './DeviceSelector.vue'
import DeviceInfo from './DeviceInfo.vue'
import MidiLogs from './MidiLogs.vue'
import KeyBindings from './KeyBindings.vue'
</script>

<template>
  <div class="midi pl5 pv3">
    <div class="midi__container">
      <div class="fl w-25 ph3">
        <DeviceSelector class="mb3" />
        <DeviceInfo class="mb4" />
        <KeyBindings />
      </div>

      <div class="fl w-75 ph3">
        <MidiLogs />
      </div>
    </div>
  </div>
</template>
