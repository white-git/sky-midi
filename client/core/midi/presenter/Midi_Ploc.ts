import { Ploc } from '../../common/presenter/Ploc'
import { Midi_App } from '../domain/Midi_App'
import { MidiBindingKind } from '../domain/models/MidiBindingKind'
import { MidiNoteEvent } from '../domain/models/MidiNoteEvent'
import { MidiBinding } from '../domain/models/MidiBinding'
import { MidiUpdate } from '../domain/models/MidiUpdate'
import { type Midi_State, initialMidiState } from './Midi_State'
import type { KeyPress_App } from '../../keypress/domain/KeyPress_App'

export class Midi_Ploc extends Ploc<Midi_State> {
  constructor(
    private readonly midiApp: Midi_App,
    private readonly keyPressApp: KeyPress_App
  ) {
    super(initialMidiState)
  }

  private listen(noteEvent: MidiNoteEvent, logs: string) {
    this.midiApp.getBindingByCode(noteEvent.code).mapRight(binding => {
      if (!this.state.binding) this.keyPressApp.keyToggle(noteEvent, binding)
    })

    this.changeState({ ...this.state, logs })
    this.setMIDIKeyBinding(noteEvent)
  }

  private setPCKeyBinding() {
    if (this.state.binding === MidiBindingKind.pc) {
      window.addEventListener(
        'keypress',
        (e: KeyboardEvent) => {
          const result = this.midiApp.updateBinding(
            <MidiBindingKind>this.state.binding,
            this.state.updating,
            MidiUpdate.create(e.key, e.keyCode),
          )

          this.changeState({
            ...this.state,
            bindings: result.getRight(),
            binding: false,
            updating: <MidiBinding>{},
          })
        },
        { once: true },
      )
    }
  }

  private setMIDIKeyBinding(noteEvent: MidiNoteEvent) {
    if (this.state.binding === MidiBindingKind.midi) {
      const result = this.midiApp.updateBinding(
        <MidiBindingKind>this.state.binding,
        this.state.updating,
        MidiUpdate.create(noteEvent.note, noteEvent.code)
      )

      this.changeState({
        ...this.state,
        bindings: result.getRight(),
        binding: false,
        updating: <MidiBinding>{},
      })
    }
  }

  async getMidiList() {
    const result = await this.midiApp.getMidiList()

    result.fold(
      error => this.changeState({ ...this.state, error }),
      devices => this.changeState({ ...this.state, devices })
    )
  }

  async setDevice(id: string) {
    const result = await this.midiApp.setDevice(id)

    result.fold(
      error => this.changeState({ ...this.state, error }),
      response => this.changeState({
        ...this.state,
        ...response,
        listening: false,
        binding: false,
      })
    )
  }

  startListening() {
    this.changeState({ ...this.state, listening: true })
    const result = this.midiApp.startListening(this.listen.bind(this))
    this.changeState({ ...this.state, logs: result.getRight() })
  }

  stopListening() {
    this.changeState({ ...this.state, listening: false })
    const result = this.midiApp.stopListening()
    this.changeState({ ...this.state, logs: result.getRight() })
  }

  addBinding() {
    const result = this.midiApp.addBinding()
    this.changeState({ ...this.state, bindings: result.getRight() })
  }

  removeBinding(binding: MidiBinding) {
    const result = this.midiApp.removeBinding(binding)
    this.changeState({ ...this.state, bindings: result.getRight() })
  }

  startBinding(binding: MidiBindingKind, updating: MidiBinding) {
    this.changeState({ ...this.state, binding, updating })
    this.setPCKeyBinding()
  }

  exportBindings() {
    this.midiApp.exportBindings()
  }

  importBindings() {
    this.midiApp.importBindings(bindings => {
      this.changeState({ ...this.state, bindings })
    })
  }
}
