import { computed } from 'vue'
import { useStore } from 'vuex'

export function useState(arr: any) {
  const store = useStore()
  const keypair = arr.map((s: any) => [s, computed(() => store.state[s])])
  return Object.fromEntries(keypair)
}

export function useGetters(arr: any) {
  const store = useStore()
  const keypair = arr.map((g: any) => [g, computed(() => store.getters[g])])
  return Object.fromEntries(keypair)
}

export function useMutations(arr: any) {
  const store = useStore()
  const keypair = arr.map((m: any) => [m, (input: any) => store.commit(m, input)])
  return Object.fromEntries(keypair)
}
