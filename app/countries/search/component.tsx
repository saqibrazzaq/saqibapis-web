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
import { CountrySearchReq } from "./CountrySearchReq";
import { CountryApi } from "@/services/CountryApi";
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
import TableNavigationButton from "@/components/table/TableNavigationButton";

function CountriesSearchComponent() {
  const [pagedRes, setPagedRes] = useState<PagedResponse<CountrySearchRes>>();
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: Common.DEFAULT_PAGE_SIZE,
  });
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const debouncedGlobalFilter = useDebounce(globalFilter, 500);

  function performSearch() {
    const searchReq = new CountrySearchReq(
      { skip: pageIndex * pageSize, take: pageSize, searchText: debouncedGlobalFilter },
      {}
    );
    CountryApi.search(searchReq)
      .then((res) => setPagedRes(res))
      .catch((error) => errorHandler(error));
  }

  useEffect(() => {
    performSearch();
  }, [pageIndex, pageSize]);

  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: Common.DEFAULT_PAGE_SIZE });
    performSearch();
  }, [debouncedGlobalFilter]);

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
      <PageHeading text="Countries" />
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
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
          <TableNavigationButton
            type="First"
            click={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <TableNavigationButton
            type="Previous"
            click={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          />
          <TableNavigationButton
            type="Next"
            click={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          />
          <TableNavigationButton
            type="Last"
            click={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          />
        </div>
      </div>
    </div>
  );
}

export default CountriesSearchComponent;
