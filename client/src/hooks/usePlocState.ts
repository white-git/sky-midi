import { Ploc } from '../../core/common/presenter/Ploc'
import { onMounted, onUnmounted, ref, type Ref, type DeepReadonly, readonly } from 'vue'

export function usePlocState<S>(ploc: Ploc<S>): DeepReadonly<Ref<S>> {
  const state = <Ref<S>>ref(ploc.state)

  const subscription = (value: S) => {
    state.value = value
  }

  onMounted(() => {
    ploc.subscribe(subscription)
  })

  onUnmounted(() => {
    ploc.unsubscribe(subscription)
  })

  return readonly(state)
}
