<script setup lang="ts">
import { watch, useTemplateRef } from 'vue'
import { Common_Provider } from '../../../core/common/Common_Provider'
import { usePlocState } from '../../hooks/usePlocState'

const ploc = Common_Provider.midiPloc
const state = usePlocState(ploc)
const textarea = useTemplateRef('textarea')

// TODO: Each time it updates the state.logs I need to scroll
// all the way to the bottom.
watch(() => state.value.logs, () => {
  if (textarea.value) {
    textarea.value.scrollTo(0, textarea.value.scrollHeight)
  }
})
</script>

<template>
  <div class="midi-logs">
    <h3 class="f6 b mt0 mb2">Midi Logs</h3>
    <textarea ref="textarea" id="logs" name="logs" class="midi-logs__logs f6 w-100 h-100 b--moon-gray br2 pa2 silver" readonly>{{ state.logs }}</textarea>
  </div>
</template>

<style scoped lang="scss">
.midi-logs {
  &__logs {
    resize: none;
    height: calc(100vh - 3.5rem);
  }
}
</style>
