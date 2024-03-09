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
import Link from "next/link";

const UserList = () => {
  const [page, setPage] = useState(1);
  const size = 10;

  const { isPending, isError, data, isFetching, isLoading } = useQuery({
    queryKey: ["user-list", page], // Include the page in the queryKey
    queryFn: () =>
      fetch(`/api/user?start=${page}&limit=${size}`).then((res) => res.json()),
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
          {data.data.map((detail: any) => {
            return (
              //                 <Card key={user[0]}>
              //   <Link href={`/${user[0]}`}>
              //     <CardBody>
              //       <p>{user[1]}</p>
              //     </CardBody>
              //   </Link>
              // </Card>
              <Card
                key={detail[0]}
                className="transition-transform transform hover:scale-105"
              >
                <Link href={`/${detail[0]}`}>
                  <CardBody>
                    <p>{detail[1]}</p>
                  </CardBody>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
      {data && (
        <Pagination
          className="mt-10"
          total={Math.ceil(data.count / 10)}
          initialPage={1}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default UserList;
