import { atomWithStorage } from 'jotai/utils'

export const persistentStorage = {
  account: atomWithStorage('account', {})
}
