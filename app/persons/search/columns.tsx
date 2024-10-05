"use client";

import PersonSearchRes from "@/models/Person/PersonSearchRes";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { parseDate } from "react-datepicker/dist/date_utils";
import { format } from "date-fns";

const columns: ColumnDef<PersonSearchRes>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isActive",
    header: "Active",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "dateOfBirth",
    header: () => <div className="">Date of Birth</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("dateOfBirth"));
      const formatted = format(date, "yyyy-MM-dd");

      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "city",
    accessorFn: (row) =>
      row.city + ", " + (row.state?.name ?? "") + ", " + (row.state?.country?.name ?? ""),
    header: "City",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const person = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/persons/${person.id}/edit`}>Edit Person</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
