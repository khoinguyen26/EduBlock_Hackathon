import { resolveComponentProps } from "@mui/base";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";



export default function useStudent() {
    const [searchKey, setSearchKey] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const searchTeachersQuery = useQuery({
        queryKey: ['search', { search: searchKey }],
        queryFn: async () =>
            axios({
                method: "GET",
                url: "https://api.baserow.io/api/database/rows/table/91163/?user_field_names=true",
                headers: {
                    Authorization: "Token XBbPCgV2nXKQ5K2r6fdNnkTiYbjDw6Xf"
                },
                params: {
                    ...(searchKey ? { search: searchKey, size: rowsPerPage, page: searchKey !== null && searchKey !== '' ? setPage(0) : page } : {}),
                }
            }),
        select: (data) => {
            return data;
        },
        onSuccess: (data) => {
            setSearchKey(prev => prev !== null ? prev : '');
        },
        refetchOnWindowFocus: false,
    });

    function fetchData() {
        searchTeachersQuery.refetch()
    }

    return {
        searchTeachersQuery,
        fetchData,
        state: {
            search: { searchKey, setSearchKey, page, setPage, rowsPerPage, setRowsPerPage }
        }
    }
}
