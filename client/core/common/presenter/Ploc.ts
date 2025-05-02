type Subscription<S> = {
  (state: S): void
}

export abstract class Ploc<S> {
  private localState: S
  private subscriptions: Subscription<S>[] = []

  constructor(initialState: S) {
    this.localState = initialState
  }

  get state() {
    return this.localState
  }

  subscribe(callback: Subscription<S>) {
    this.subscriptions.push(callback)
  }

  unsubscribe(callback: Subscription<S>) {
    const i = this.subscriptions.indexOf(callback)
    if (~i) this.subscriptions.splice(i, 1)
  }

  refresh() {
    this.subscriptions.forEach(fn => fn(this.localState))
  }

  changeState(state: S) {
    this.localState = state
    this.refresh()
  }
}
