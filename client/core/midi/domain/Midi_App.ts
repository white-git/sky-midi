import { Either } from '../../common/domain/Either'
import type { MidiApi_Repository } from './MidiApi_Repository'
import type { MidiMemory_Repository } from './MidiMemory_Repository'
import type { MidiLogs_Repository } from './MidiLogs_Repository'
import { MidiNoteEvent } from './models/MidiNoteEvent'
import { MidiBinding } from './models/MidiBinding'
import { MidiUpdate } from './models/MidiUpdate'
import { MidiBindingKind } from './models/MidiBindingKind'

export class Midi_App {
  constructor(
    private readonly midiApi: MidiApi_Repository,
    private readonly midiMemory: MidiMemory_Repository,
    private readonly midiLogs: MidiLogs_Repository,
  ) {}

  async getMidiList() {
    const result = await this.midiApi.getMidiList()
    return result.right(list => Either.right(Array.from(list).map(input => input[1])))
  }

  async setDevice(id: string) {
    this.stopListening(false)
    const result = await this.midiApi.getDeviceById(id)

    return result.right(device => {
      this.midiLogs.write(`Selected device "${device.name}"\n`)
      this.midiMemory.setDevice(device)
      return Either.right({
        device,
        logs: this.midiLogs.all().getRight(),
        bindings: this.midiMemory.clearBindings().getRight(),
      })
    })
  }

  startListening(fn: (noteEvent: MidiNoteEvent, logs: string) => void) {
    const result = this.midiMemory.getDevice()
    return result.right(input => {
      this.midiLogs.write('Listening to midi events...\n')
      input.onmidimessage = (event: MIDIMessageEvent) => {
        if (event.data) {
          const command = event.data[0]
          const note = event.data[1]
          const noteEvent = MidiNoteEvent.create(command, note)
          // const velocity = event.data[2]
          // TODO: test.
          this.midiLogs.write(`event: ${noteEvent.direction}, note: ${noteEvent.note}\n`)
          fn(noteEvent, this.midiLogs.all().getRight())
        }
      }

      return Either.right(this.midiLogs.all().getRight())
    })
  }

  stopListening(log = true) {
    const result = this.midiMemory.getDevice()
    return result.right(input => {
      if (log) this.midiLogs.write('Stop listening to midi events\n')
      input.onmidimessage = null
      return Either.right(this.midiLogs.all().getRight())
    })
  }

  addBinding() {
    return this.midiMemory.addBinding(MidiBinding.create())
  }

  removeBinding(binding: MidiBinding) {
    return this.midiMemory.removeBinding(binding)
  }

  updateBinding(kind: MidiBindingKind, binding: MidiBinding, update: MidiUpdate) {
    switch (kind) {
      case MidiBindingKind.pc:
        return this.midiMemory.updateBinding(binding, { keyPC: update.key, codePC: update.code })
      case MidiBindingKind.midi:
        return this.midiMemory.updateBinding(binding, { keyMIDI: update.key, codeMIDI: update.code })
    }
  }

  exportBindings() {
    const bindings = this.midiMemory.getBindings().getRight()
    const csv = (
      'data:text/csv;charset=utf-8,MIDI_KEY_BINDINGS\n' +
      bindings.map(({ id, keyPC, codePC, keyMIDI, codeMIDI }) => {
        return `${id},${keyPC},${codePC},${keyMIDI},${codeMIDI}`
      }).join('\n')
    )

    const link = document.createElement('a')
    link.href = encodeURI(csv)
    link.download = `${Date.now()}_bindings.csv`
    link.click()
  }

  importBindings(fn: (bindings: MidiBinding[]) => void) {
    const handleFile = (e: Event) => {
      const [file] = (<HTMLInputElement>e.target).files || []
      if (!file) return
      const reader = new FileReader()

      reader.onload = (e: Event) => {
        const { result } = <{ result: string }>(<FileReader>e.target)

        if (result) {
          let valid = false
          const bindings = result
            .split('\n')
            .map(r => r.split(','))
            .map(r => {
              const [id, keyPC, codePC, keyMIDI, codeMIDI] = r
              if (id === 'MIDI_KEY_BINDINGS') valid = true
              return MidiBinding.create(keyPC, +codePC, keyMIDI, +codeMIDI, id)
            })
            .filter(r => r.id !== 'MIDI_KEY_BINDINGS')

          if (valid) fn(this.midiMemory.setBindings(bindings).getRight())
        }
      }

      reader.readAsText(file)
    }

    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = handleFile
    input.click()
  }

  getBindingByCode(code: number) {
    return this.midiMemory.getBindingByCode(code)
  }
}
