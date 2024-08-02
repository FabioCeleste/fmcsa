import { AppContextProps } from "@/types/store";
import axios from "axios";
import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSearchContext } from "./searchContext";

const AppContext = createContext<AppContextProps>({} as AppContextProps);

const AppProvider: FC<{ children: JSX.Element }> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [renderedCompanies, setRenderedCompanies] = useState<any[]>([]);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [allDates, setAllDates] = React.useState({
    createdAllDates: false,
    updatedAllDates: false,
    outOfServiceDate: false,
  });
  const {
    dbaName,
    legalName,
    physicalAddress,
    phone,
    dot,
    powerUnits,
    mcMxFF,
    createdDT,
    entity,
    modifiedDT,
    operatingStatus,
    outOfServiceDate,
  } = useSearchContext();

  const handleShowAll = async () => {
    setIsModalOpen(false);

    const allItems = await axios.post(
      `/api/get-filtered?limit=${rowsPerPage}&page=1`
    );

    console.log("hi");

    setRenderedCompanies(allItems.data.data);
    setTotalCompanies(allItems.data.total);
  };

  const handleSearch = async (firstSearch?: boolean) => {
    const allItems = await axios.post(
      `/api/get-filtered?limit=${rowsPerPage}&page=${firstSearch ? 1 : page}`,
      {
        dbaName,
        legalName,
        physicalAddress,
        phone,
        dot,
        powerUnits,
        mcMxFF,
        createdDT: !allDates.createdAllDates && createdDT,
        modifiedDT: !allDates.updatedAllDates && modifiedDT,
        outOfServiceDate: !allDates.outOfServiceDate && outOfServiceDate,
        operatingStatus,
        entity,
      }
    );

    setRenderedCompanies(allItems.data.data);
    setTotalCompanies(allItems.data.total);

    setIsModalOpen(false);
  };

  useEffect(() => {
    (async () => {
      handleSearch();
    })();
  }, [page, rowsPerPage]);

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        renderedCompanies,
        setRenderedCompanies,
        totalCompanies,
        setTotalCompanies,
        page,
        setPage,
        rowsPerPage,
        setRowsPerPage,
        handleShowAll,
        handleSearch,
        allDates,
        setAllDates,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppProvider, useAppContext };
