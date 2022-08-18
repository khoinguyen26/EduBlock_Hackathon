import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import useSearch from './useSearch';

export default function useList() {
    const { searchTeachersQuery: { data: searchData } } = useSearch();

    const listResult = useQueries({
        queries:
            searchData && searchData.length > 0 ? searchData.map((item) => ({
                queryKey: ["list", "search", item.id],
                queryFn: async ({ queryKey }) =>
                    axios({
                        method: "GET",
                        url: "https://api.baserow.io/api/database/rows/table/91165/?user_field_names=true",
                        headers: {
                            Authorization: "Token XBbPCgV2nXKQ5K2r6fdNnkTiYbjDw6Xf"
                        },
                        params: {
                            ...(queryKey[2] ? { search: queryKey[2], size: 5 } : {}),
                        },
                    }),
                select: (data) => {
                    const { data: listTeacher } = data;
                    return listTeacher;
                },
                onSuccess: (data) => { }
            })) : [],
    })


    return listResult
}
