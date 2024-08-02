import dayjs from "dayjs";
import React from "react";

export type SearchContextProps = {
  createdDT: dayjs.Dayjs | null;
  setCreatedDT: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;

  modifiedDT: dayjs.Dayjs | null;
  setModifiedDT: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;

  entity: string[];
  setEntity: React.Dispatch<React.SetStateAction<string[]>>;

  operatingStatus: string;
  setOperatingStatus: React.Dispatch<React.SetStateAction<string>>;

  legalName: string;
  setLegalName: React.Dispatch<React.SetStateAction<string>>;

  dbaName: string;
  setDbaName: React.Dispatch<React.SetStateAction<string>>;

  physicalAddress: string;
  setPhysicalAddress: React.Dispatch<React.SetStateAction<string>>;

  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;

  dot: string;
  setDot: React.Dispatch<React.SetStateAction<string>>;

  mcMxFF: string;
  setMcMxFF: React.Dispatch<React.SetStateAction<string>>;

  powerUnits: string;
  setPowerUnits: React.Dispatch<React.SetStateAction<string>>;

  outOfServiceDate: dayjs.Dayjs | null;
  setOutOfServiceDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
};

export type AppContextProps = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderedCompanies: any[];
  setRenderedCompanies: React.Dispatch<React.SetStateAction<any[]>>;
  totalCompanies: number;
  setTotalCompanies: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;

  handleShowAll: () => void;
  handleSearch: (isFirstSearch?: boolean) => void;

  allDates: {
    createdAllDates: boolean;
    updatedAllDates: boolean;
    outOfServiceDate: boolean;
  };

  setAllDates: React.Dispatch<
    React.SetStateAction<{
      createdAllDates: boolean;
      updatedAllDates: boolean;
      outOfServiceDate: boolean;
    }>
  >;
};
