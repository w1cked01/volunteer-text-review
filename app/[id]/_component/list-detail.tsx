"use client";

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Pagination, PaginationItem, PaginationCursor } from "@nextui-org/pagination";
import { Skeleton } from "@nextui-org/skeleton";
import React, { useState } from 'react'
import { Card, CardBody } from '@nextui-org/card';

const ListDetail = ({ userId }: { userId: string }) => {

    const [page, setPage] = useState(1);
    const size = 10;


    const { isPending, isError, data, isFetching, isLoading } = useQuery({
        queryKey: ["player-list", page], // Include the page in the queryKey
        queryFn: () => fetch(`/api?start=${page}&userId=${userId}&limit=${size}`).then(res => res.json()),
        placeholderData: keepPreviousData,
    });

    const handlePageChange = (page: number) => {
        if(page === 1) {setPage(1)}
        else setPage((page-1) * size);
    }

    return (
        <>
            {isPending || isFetching ? (
                <div className='space-y-2'>
                    {
                        Array.from({ length: 10 }).map((_, i) => (
                            <Skeleton key={i} className="rounded-lg">
                                <div className="h-10 w-full rounded-lg bg-default-300"></div>
                            </Skeleton>
                        ))
                    }
                </div>
            ) : isError ? (
                <div>Error</div>
            ) : (
                <div className='space-y-2'>
                    {data.data.map((detail: any) => {
                        return (
                            <Card key={detail[0]}>
                                <CardBody>
                                    <p>{detail[1]}</p>
                                </CardBody>
                            </Card>
                        );
                    })}
                </div>
            )}
            {data && <Pagination isCompact showControls className='mt-10' total={Math.ceil(data.count / 10)} initialPage={1} onChange={handlePageChange} />}
        </>
    )
}

export default ListDetail