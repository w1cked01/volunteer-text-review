"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from "@nextui-org/pagination";
import { Skeleton } from "@nextui-org/skeleton";
import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { useRouter } from "next/navigation";
const ListDetail = ({ userId }: { userId: string }) => {
  const [page, setPage] = useState(1);
  const size = 10;
  const router = useRouter();
  const { isPending, isError, data, isFetching, isLoading } = useQuery({
    queryKey: ["player-list", page], // Include the page in the queryKey
    queryFn: () =>
      fetch(`/api?start=${page}&userId=${userId}&limit=${size}`).then((res) =>
        res.json()
      ),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    if (page === 1) {
      setPage(1);
    } else setPage((page - 1) * size);
  };

  return (
    <>
      {isPending || isFetching ? (
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="rounded-lg">
              <div className="h-10 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
        </div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="transition-transform transform hover:scale-105 bg-[#0070F0] hover:bg-[#3F3F46] text-white font-bold rounded-full item-center justify-center py-2 px-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
              />
            </svg>
          </button>
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
      {data && (
        <Pagination
          isCompact
          showControls
          className="mt-10"
          total={Math.ceil(data.count / 10)}
          initialPage={1}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ListDetail;
