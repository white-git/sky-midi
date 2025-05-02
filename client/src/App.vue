<script setup lang="ts">
import Sidebar from './components/sidebar/Sidebar.vue'
import Midi from './components/midi/Midi.vue'
import KeyMidiInput from './components/midi/KeyMidiInput.vue'
import './normalize.css'
import './colors.scss'
import 'tachyons/css/tachyons.min.css'

import { Common_Provider } from '../core/common/Common_Provider'
import { usePlocState } from './hooks/usePlocState'

const ploc = Common_Provider.midiPloc
const state = usePlocState(ploc)
</script>

<template>
  <div id="app" class="app bg-light-gray w-100 courier">
    <KeyMidiInput v-if="state.binding" />
    <Sidebar />
    <Midi />
  </div>
</template>

<style scoped>
.app {
  height: 100vh;
}
</style>
