export class UID_Helper {
  static generate() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36).slice(2)
  }
}
