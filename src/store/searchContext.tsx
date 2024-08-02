import { SearchContextProps } from "@/types/store";
import dayjs from "dayjs";
import React, { FC, createContext, useContext, useState } from "react";

const SearchContext = createContext<SearchContextProps>(
  {} as SearchContextProps
);

const SearchProvider: FC<{ children: JSX.Element }> = (props) => {
  const [createdDT, setCreatedDT] = useState<dayjs.Dayjs | null>(null);
  const [modifiedDT, setModifiedDT] = useState<dayjs.Dayjs | null>(null);
  const [entity, setEntity] = useState<string[]>([]);
  const [operatingStatus, setOperatingStatus] = useState("");
  const [legalName, setLegalName] = useState("");
  const [dbaName, setDbaName] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [dot, setDot] = useState("");
  const [mcMxFF, setMcMxFF] = useState("");
  const [powerUnits, setPowerUnits] = useState("");
  const [outOfServiceDate, setOutOfServiceDate] = useState<dayjs.Dayjs | null>(
    null
  );

  return (
    <SearchContext.Provider
      value={{
        createdDT,
        setCreatedDT,
        modifiedDT,
        setModifiedDT,
        entity,
        setEntity,
        operatingStatus,
        setOperatingStatus,
        legalName,
        setLegalName,
        dbaName,
        setDbaName,
        physicalAddress,
        setPhysicalAddress,
        phone,
        setPhone,
        dot,
        setDot,
        mcMxFF,
        setMcMxFF,
        powerUnits,
        setPowerUnits,
        outOfServiceDate,
        setOutOfServiceDate,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

const useSearchContext = () => useContext(SearchContext);

export { SearchProvider, useSearchContext };
