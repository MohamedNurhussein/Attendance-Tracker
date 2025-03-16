"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Records = {
  recordId: string;
  date: string;
  time: string;
  classId: string;
};

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "classId",
    header: "Class ID",
  },
];
