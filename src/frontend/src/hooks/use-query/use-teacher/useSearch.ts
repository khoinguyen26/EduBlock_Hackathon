import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";



export default function useSearch() {
    const [searchKey, setSearchKey] = useState('');

    const searchTeachersQuery = useQuery({
        queryKey: ['search'],
        queryFn: async () =>
            axios({
                method: "GET",
                url: "https://api.baserow.io/api/database/rows/table/91165/?user_field_names=true",
                headers: {
                    Authorization: "Token XBbPCgV2nXKQ5K2r6fdNnkTiYbjDw6Xf"
                },
                params: {
                    ...(searchKey ? { search: searchKey, size: 5 } : {}),
                }
            }),
        select: (data) => {
            const { data: searchRes } = data;
            return searchRes
        },
        onSuccess: (data) => {
            setSearchKey(prev => prev !== null ? prev : null);
        }
    });

    return {
        searchTeachersQuery,
        state: {
            search: { searchKey, setSearchKey }
        }
    }
}
