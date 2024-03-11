// Import necessary modules and components
"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  Pagination,
} from "@nextui-org/pagination";
import { Skeleton } from "@nextui-org/skeleton";
import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";

// UserList component
const UserList = () => {
  // State for managing pagination
  const [page, setPage] = useState(1);
  const size = 10; // Number of items per page

  // Fetch user data using useQuery hook
  const { isPending, isError, data, isFetching, isLoading } = useQuery({
    queryKey: ["user-list", page], // Unique key for the query
    queryFn: () =>
      fetch(`/api/user?start=${page}&limit=${size}`).then((res) => res.json()), // Function to fetch data
    placeholderData: keepPreviousData, // Keep previous data while fetching
  });

  // Function to handle page change
  const handlePageChange = (page: number) => {
    if (page === 1) {
      setPage(1);
    } else setPage((page - 1) * size); // Adjust page number
  };

  // Render skeleton loading or error if pending or fetching, otherwise render user list
  return (
    <>
      {isPending || isFetching ? ( // Loading state
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="rounded-lg">
              <div className="h-10 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          ))}
        </div>
      ) : isError ? ( // Error state
        <div>Error</div>
      ) : (
        // User list
        <div className="space-y-2">
          {data.data.map((detail: any) => {
            // Iterate over user data and render cards
            return (
              <Card
                key={detail[0]} // Key for React rendering
                className="transition-transform transform hover:scale-105" // CSS transition
              >
                <Link href={`/${detail[0]}`}>
                  {" "}
                  {/* Link to user detail page */}
                  <CardBody>
                    {" "}
                    {/* Card body */}
                    <p>{detail[1]}</p> {/* User name */}
                  </CardBody>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
      {data && ( // Pagination component if data is available
        <Pagination
          className="mt-10"
          total={Math.ceil(data.count / 10)} // Total number of pages
          initialPage={1} // Initial page
          onChange={handlePageChange} // Page change handler
        />
      )}
    </>
  );
};

export default UserList; // Export UserList component
