import { BaseInterface } from '@fe/constants'
import { atomWithStorage } from 'jotai/utils'

interface AccountInterface extends BaseInterface {
  id: number
  order: string
  accountId: string
  firstName: string
  lastName: string
  dateOfBirth: string
  address: string
  principalId: string
  role: { id: number; value: string }
  token: { id: number; value: string }
  phone: string
  email: string
  gender: string
}

export const persistentStorage = {
  account: atomWithStorage<AccountInterface>('account', {
    id: 0,
    order: '',
    accountId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    principalId: '',
    role: {
      id: 0,
      value: ''
    },
    token: {
      id: 0,
      value: ''
    },
    phone: '',
    email: '',
    gender: ''
  })
}
