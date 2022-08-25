import { BaseInterface } from '@fe/constants'
import { useDebounce } from '@fe/hooks'
import { useQuery } from '@fe/hooks/use-query/core'
import { useState } from 'react'

interface UseClassQueryProps extends BaseInterface {
  initialProps: {
    page: number
    pageSize: number
    search?: string
  }
  sideEffectFunctions?: {
    onError?: (error) => void
    onSuccess?: (data) => void
    onSettled?: (data, error) => void
  }
}

const apiFields = [
  {
    localPropName: 'id',
    remotePropName: 'id'
  },
  {
    localPropName: 'order',
    remotePropName: 'order'
  },
  {
    localPropName: 'classId',
    remotePropName: 'ClassId'
  },
  {
    localPropName: 'className',
    remotePropName: 'ClassName'
  },
  {
    localPropName: 'grade',
    remotePropName: 'Grade'
  },
  {
    localPropName: 'teacher',
    remotePropName: 'Teacher'
  },
  {
    localPropName: 'year',
    remotePropName: 'Year'
  }
]

const ENDPOINT = 'rows/table/88766/'

export function useClassQuery(props: UseClassQueryProps) {
  const {
    initialProps,
    sideEffectFunctions: {
      onError: onErrorCallback,
      onSuccess: onSuccessCallback,
      onSettled: onSettledCallback
    }
  }: UseClassQueryProps = {
    ...props,
    ...(typeof props.sideEffectFunctions === 'undefined'
      ? {
          sideEffectFunctions: {
            onError(error) {},
            onSuccess(data) {},
            onSettled(data, error) {}
          }
        }
      : props.sideEffectFunctions)
  }
  const [classes, setClasses] = useState<any[]>([])
  const [pagination, setPagination] = useState({})

  const [page, setPage] = useState(initialProps.page)
  const [pageSize, setPageSize] = useState(initialProps.pageSize)
  const [search, setSearch] = useState(initialProps.search)

  const { debouncedValue: searchDebounced } = useDebounce({
    value: search,
    delay: 500
  })

  const queryResult = useQuery({
    options: {
      enabled: false,
      queryKey: [
        {
          endpoint: ENDPOINT,
          page,
          pageSize,
          search: searchDebounced
        }
      ],
      onSettled(data, error) {
        if (typeof onSettledCallback === 'function')
          onSettledCallback(data, error)
      },
      onError(error) {
        if (typeof onErrorCallback === 'function') onErrorCallback(error)
      },
      onSuccess(data: any) {
        const {
          data: { count, next, previous, results }
        } = data
        setClasses((_) => {
          // format data and return formatted data
          const formattedResult = Array.isArray(results)
            ? results.map((aclass) =>
                apiFields.reduce(
                  (prev, { localPropName, remotePropName }) => ({
                    ...prev,
                    [localPropName]: aclass[remotePropName]
                  }),
                  {}
                )
              )
            : []

          if (typeof onSuccessCallback === 'function')
            onSuccessCallback(formattedResult)
          // console.log(formattedResult)
          return formattedResult
        }),
          setPagination((_) => {
            // format data and return formatted data
            return { count, next, previous }
          })
      }
    },
    requestOptions: {
      endpoint: ENDPOINT,
      method: 'GET',
      query: {
        user_field_names: true,
        page: page + 1,
        size: pageSize,
        ...(typeof searchDebounced === 'string' && searchDebounced.length > 0
          ? { search: searchDebounced }
          : {})
      }
    }
  })

  return {
    queryResult,
    state: {
      apiData: {
        classes: {
          classes
          // setAdmins
        },
        pagination: {
          pagination
          // setPagination
        }
      },
      queryOptions: {
        page: { page, setPage },
        pageSize: { pageSize, setPageSize },
        search: { search, setSearch }
      }
    }
  }
}
