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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { CustomCombobox } from "@/components/CustomCombobox";
import { DropdownReq, DropdownRes } from "@/models/Dropdowns/DropdownDtos";
import { DropdownApi } from "@/services/DropdownApi";

function PersonsSearchComponent() {
  const [pagedRes, setPagedRes] = useState<PagedResponse<PersonSearchRes>>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: parseInt(searchParams.get("pageIndex") ?? "0"),
    pageSize: parseInt(searchParams.get("pageSize") ?? Common.DEFAULT_PAGE_SIZE.toString()),
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [states, setStates] = useState<DropdownRes[]>([]);
  const handleStateSearchChanged = async (value: string) => {
    DropdownApi.getStates({ searchText: value })
      .then((res) => setStates(res))
      .catch((error) => console.log(error));
  };
  const [globalFilter, setGlobalFilter] = React.useState(searchParams.get("searchText") ?? "");

  const debouncedGlobalFilter = useDebounce(globalFilter, 500);

  const [searchReq, setSearchReq] = useState<PersonSearchReq>(
    new PersonSearchReq(
      {
        pageIndex: pageIndex,
        pageSize: pageSize,
        searchText: debouncedGlobalFilter,
      },
      {
        countryId: searchParams.get("countryId") ?? "",
        stateId: searchParams.get("stateId") ?? "",
      }
    )
  );

  function performSearch() {
    const searchReqFromParams = new PersonSearchReq(
      {
        pageIndex: parseInt(searchParams.get("pageIndex") ?? "0"),
        pageSize: parseInt(searchParams.get("pageSize") ?? Common.DEFAULT_PAGE_SIZE.toString()),
        searchText: searchParams.get("searchText") ?? "",
      },
      {
        countryId: searchParams.get("countryId") ?? "",
        stateId: searchParams.get("stateId") ?? "",
      }
    );
    PersonApi.search(searchReqFromParams)
      .then((res) => setPagedRes(res))
      .catch((error) => errorHandler(error));
  }

  function updateUrl(req: PersonSearchReq) {
    router.push(
      `/persons/search?searchText=${req.searchText}&countryId=${req.countryId}&stateId=${req.stateId}&pageIndex=${req.pageIndex}&pageSize=${req.pageSize}`
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

  useEffect(() => {
    performSearch();
  }, [searchParams]);

  function loadStates() {
    DropdownApi.getStates(new DropdownReq("", searchReq.stateId))
      .then((res) => setStates(res))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    loadStates();
  }, []);

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
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-64"
          />
          <CustomCombobox
            className="w-64"
            items={states}
            onSelect={(value) => {
              //form.setValue("stateId", value);
              setSearchReq({ ...searchReq, stateId: value });
              updateUrl({ ...searchReq, stateId: value });
              // console.log("selected state: " + value);
            }}
            onSearchChange={handleStateSearchChanged}
            value={searchReq.stateId}
            searchPlaceholder="Search state..."
            selectItemMsg="Select country/state"
            unselect={true}
          />
        </div>
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
