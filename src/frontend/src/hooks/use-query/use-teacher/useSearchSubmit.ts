import { useQuery } from '@tanstack/react-query';
import { request } from '../core';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function useSearchSubmit(props: any) {
    const { search } = props;
    const [page, setPage] = useState(parseInt(props?.page) || 1);
    const { refetch, ...restProps } = useQuery({
        enabled: false,
        queryKey: ['search', { search, page: page }],
        queryFn: async ({ queryKey: [_, query] }) => {
            return axios({
                method: "GET",
                url: "https://api.baserow.io/api/database/rows/table/91165/?user_field_names=true",
                headers: {
                    Authorization: "Token XBbPCgV2nXKQ5K2r6fdNnkTiYbjDw6Xf"
                },
                params: {
                    search: query.search,
                    size: 5,
                }
            })
        },
        select: (data) => { return data },
        onSuccess: (data) => {
            const firstRec = data.data[0];
            console.log(data)
        }
    })

    function fetchData(data) {
        refetch({
            queryKey: ['search', { search: data.FirstName }],
        })
    }

    return { ...restProps, fetchData, setPage }
}
