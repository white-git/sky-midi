<script setup lang="ts">
import { Common_Provider } from '../../../core/common/Common_Provider'
import { MidiBindingKind } from '../../../core/midi/domain/models/MidiBindingKind'
import { MidiBinding } from '../../../core/midi/domain/models/MidiBinding'
import { usePlocState } from '../../hooks/usePlocState'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

const ploc = Common_Provider.midiPloc
const state = usePlocState(ploc)

const setPcKey = (binding: MidiBinding) => {
  ploc.startBinding(MidiBindingKind.pc, binding)
}

const setMidiKey = (binding: MidiBinding) => {
  ploc.startBinding(MidiBindingKind.midi, binding)
}

const addBinding = () => {
  ploc.addBinding()
}

const removeBinding = (binding: MidiBinding) => {
  ploc.removeBinding(binding)
}
</script>

<template>
  <div class="keybindings">
    <h4 class="b f6 mt0 mb2">Key Bindings</h4>

    <div class="keybindings__table-wrapper mb2">
      <table class="keybindings__table ba b--moon-gray w-100 bg-white">
        <colgroup>
          <col style="width: 30px;">
          <col>
          <col>
        </colgroup>

        <thead>
          <tr>
            <th></th>
            <th class="normal f6">PC Key</th>
            <th class="normal f6">MIDI Key</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="binding in state.bindings" :key="binding.id">
            <td class="tc">
              <button class="keybindings__delete bn bg-white red mt1 pointer" @click="removeBinding(binding)">
                <FontAwesomeIcon :icon="faTrash" size="xs" />
              </button>
            </td>
            <td>
              <input
                class="keybindings__key-input ph2 pointer bn w-100"
                type="text"
                @click="setPcKey(binding)"
                :value="binding.keyPC"
                readonly
              />
            </td>
            <td>
              <input
                class="keybindings__key-input ph2 pointer bn w-100"
                type="text"
                @click="setMidiKey(binding)"
                :disabled="!state.listening"
                :value="binding.keyMIDI"
                readonly
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="keybindings__add ba b--moon-gray bg-white br2 pointer" :disabled="!state.device" @click="addBinding">
      <FontAwesomeIcon :icon="faPlus" size="sm" class="mt1" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.keybindings {
  &__table-wrapper {
    max-height: calc(100vh - 17.5rem);
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__table {
    table-layout: fixed;
    border-collapse: collapse;
    td, th {
      border: solid 1px var(--moon-gray);
    }
  }
  &__add {
    width: 28px;
    height: 28px;
  }
}
</style>
