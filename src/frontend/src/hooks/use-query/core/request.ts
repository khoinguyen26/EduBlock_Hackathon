import { BaseInterface } from '@fe/constants'
import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

export interface RequestProps extends BaseInterface {
  token?: string
  method: 'GET' | 'POST' | 'PATCH'
  baseUrl?: string
  endpoint: string
  query?: object
  body?: object
}

const defaultProps: RequestProps = {
  token: '55SETFB04WnWG5pqUhDOpUuWsktrS7wZ',
  method: 'GET',
  baseUrl: 'https://api.baserow.io/api/database',
  endpoint: '',
  query: {},
  body: undefined
}

export async function request(props: RequestProps) {
  const mergedProps = _.merge(_.clone(defaultProps), props)
  const {
    method,
    baseUrl: baseURL,
    endpoint: url,
    query: params,
    body: data,
    token
  } = mergedProps

  const requestConfig: AxiosRequestConfig = {
    method,
    baseURL,
    url,
    params,
    ...(_.isObjectLike(data) && method !== 'GET' ? data : {}),
    headers: {
      Authorization: `Token ${token}`
    }
  }

  return axios(requestConfig)
}
