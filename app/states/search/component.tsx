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
import { StateSearchReq } from "./StateSearchReq";
import { StateApi } from "@/services/StateApi";
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
import StateSearchRes from "./StateSearchRes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CountryRes from "@/models/Country/CountryRes";
import { CountryApi } from "@/services/CountryApi";

function StateSearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pagedRes, setPagedRes] = useState<PagedResponse<StateSearchRes>>();
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: parseInt(searchParams.get("pageIndex") ?? "0"),
    pageSize: parseInt(searchParams.get("pageSize") ?? Common.DEFAULT_PAGE_SIZE.toString()),
  });
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const debouncedGlobalFilter = useDebounce(globalFilter, 500);

  const [country, setCountry] = useState<CountryRes>();

  const [searchReq, setSearchReq] = useState<StateSearchReq>(
    new StateSearchReq(
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
        searchText: debouncedGlobalFilter,
      },
      { countryId: searchParams.get("countryId") ?? "" }
    )
  );

  function performSearch() {
    const searchReqFromParams = new StateSearchReq(
      {
        pageIndex: parseInt(searchParams.get("pageIndex") ?? "0"),
        pageSize: parseInt(searchParams.get("pageSize") ?? Common.DEFAULT_PAGE_SIZE.toString()),
        searchText: searchParams.get("searchText") ?? "",
      },
      {
        countryId: searchParams.get("countryId") ?? "",
      }
    );
    StateApi.search(searchReqFromParams)
      .then((res) => setPagedRes(res))
      .catch((error) => errorHandler(error));
  }

  function updateUrl(req: StateSearchReq) {
    router.push(
      `/states/search?countryId=${req.countryId}&searchText=${req.searchText}&pageIndex=${req.pageIndex}&pageSize=${req.pageSize}`
    );
  }

  useEffect(() => {
    updateUrl({
      ...searchReq,
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchText: debouncedGlobalFilter,
    });
  }, [pageIndex, pageSize]);

  useEffect(() => {
    if (pagedRes) {
      setPagination({ pageIndex: 0, pageSize });
      updateUrl({ ...searchReq, pageIndex: 0, searchText: debouncedGlobalFilter });
    } else {
      updateUrl({ ...searchReq, searchText: debouncedGlobalFilter });
    }
  }, [debouncedGlobalFilter]);

  function loadCountry() {
    if (searchReq.countryId) {
      CountryApi.get(searchReq.countryId)
        .then((res) => setCountry(res))
        .catch((error) => errorHandler(error));
    }
  }

  useEffect(() => {
    performSearch();
    loadCountry();
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
      <PageHeading text={`States - ${country?.name}`} />
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Button className="">
          <Link href={`/states/create?countryId=${searchReq.countryId}`}>Create State</Link>
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

export default StateSearchComponent;
