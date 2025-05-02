export class MidiUpdate {
  key: string
  code: number

  constructor(key: string, code: number) {
    this.key = key
    this.code = code
  }

  static create(key: string, code: number) {
    return new this(key, code)
  }
}
