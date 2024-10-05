"use client";

import useDebounce from "@/lib/debounce";
import { PagedResponse } from "@/models/PagedResponse";
import Common from "@/util/Common";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { PersonSearchReq } from "./PersonSearchReq";
import { PersonApi } from "@/services/PersonApi";
import { errorHandler } from "@/axios/SaqibAPIsClient";
import columns from "./columns";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeading from "@/components/PageHeading";
import PersonSearchRes from "@/models/Person/PersonSearchRes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronFirst, ChevronLast } from "lucide-react";

function PersonsSearchComponent() {
  const [pagedRes, setPagedRes] = useState<PagedResponse<PersonSearchRes>>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: parseInt(searchParams.get("pageIndex") ?? "0"),
    pageSize: parseInt(searchParams.get("pageSize") ?? Common.DEFAULT_PAGE_SIZE.toString()),
  });
  const [globalFilter, setGlobalFilter] = React.useState(searchParams.get("searchText") ?? "");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const debouncedGlobalFilter = useDebounce(globalFilter, 500);

  function performSearch() {
    const searchText = searchParams.get("searchText") ?? "";
    const searchReq = new PersonSearchReq(
      { skip: pageIndex * pageSize, take: pageSize, searchText: searchText },
      {}
    );
    // console.log(`perform search - pageIndex=${pageIndex}, take=${pageSize}`);
    PersonApi.search(searchReq)
      .then((res) => setPagedRes(res))
      .catch((error) => errorHandler(error));
  }

  function updateUrl(pageIndex: number, pageSize: number, searchText: string) {
    router.push(
      `/persons/search?searchText=${searchText}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }

  useEffect(() => {
    updateUrl(pageIndex, pageSize, debouncedGlobalFilter);
  }, [pageIndex, pageSize]);

  useEffect(() => {
    if (pagedRes) {
      // console.log("Resetting page");
      setPagination({ pageIndex: 0, pageSize });
      updateUrl(0, pageSize, debouncedGlobalFilter);
    } else {
      updateUrl(pageIndex, pageSize, debouncedGlobalFilter);
    }
  }, [debouncedGlobalFilter]);

  useEffect(() => {
    performSearch();
  }, [searchParams]);

  const table = useReactTable({
    data: pagedRes?.data ?? [],
    columns,
    rowCount: pagedRes?.totalRows,
    state: {
      columnFilters,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="w-full">
      <PageHeading text="Persons" />
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Button className="">
          <Link href={"/persons/create"}>Create Person</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4 text-sm">
        <div className="flex-grow text-muted-foreground">Total Rows: {pagedRes?.totalRows}</div>
        <div className="px-8">
          Page {pageIndex + 1} of {Math.ceil((pagedRes?.totalRows ?? 1) / pageSize)}
        </div>
        <div className="space-x-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  className={
                    !table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined
                  }
                  aria-disabled={!table.getCanPreviousPage()}
                  onClick={() => table.firstPage()}
                  href="#"
                >
                  <ChevronFirst size={"16px"} />
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  className={
                    !table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined
                  }
                  aria-disabled={!table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  href="#"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
                  aria-disabled={!table.getCanNextPage()}
                  onClick={() => table.nextPage()}
                  href="#"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
                  aria-disabled={!table.getCanNextPage()}
                  onClick={() => table.lastPage()}
                  href="#"
                >
                  <ChevronLast size={"16px"} />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default PersonsSearchComponent;
