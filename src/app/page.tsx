"use client";

import SearchModal from "@/components/Modal";
import EntityTable from "@/components/Table";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Home() {
  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <EntityTable />
        <SearchModal />
      </LocalizationProvider>
    </main>
  );
}
