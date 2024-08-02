"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { useSearchContext } from "../../store/searchContext";
import ReactInputMask from "react-input-mask";
import { useAppContext } from "@/store/appContext";

const entityOptions = [
  "CARRIER",
  "IEP",
  "BROKER",
  "SHIPPER",
  "FREIGHT",
  "FORWARDER",
  "CARGO",
  "TANK",
];
const statusOptions = ["active", "inactive"];

const SearchModal = () => {
  const {
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
  } = useSearchContext();

  const {
    isModalOpen,
    setIsModalOpen,
    handleShowAll,
    handleSearch,
    setPage,
    allDates,
    setAllDates,
  } = useAppContext();

  const handleAllDatesChange = (name: any) => {
    setAllDates((prev: any) => {
      const newValue = !prev[name];
      if (newValue) {
        if (name === "createdAllDates") {
          setCreatedDT(null);
        } else if (name === "updatedAllDates") {
          setModifiedDT(null);
        }
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleSelectOperatingStatus = (value: string) => {
    setOperatingStatus((prevValue) => (prevValue === value ? "" : value));
  };

  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DialogTitle>Search</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allDates.createdAllDates}
                  onChange={() => handleAllDatesChange("createdAllDates")}
                />
              }
              label="All Created Dates"
            />
            {!allDates.createdAllDates && (
              <DatePicker
                label="Created DT"
                value={createdDT}
                onChange={(date) => setCreatedDT(date)}
              />
            )}
            <FormControl fullWidth margin="normal">
              <InputLabel>Entity</InputLabel>
              <Select
                multiple
                name="entity"
                value={entity}
                onChange={(e: any) => setEntity(e.target.value)}
                renderValue={(selected) => selected.join(", ")}
              >
                {entityOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              name="legalName"
              label="Legal name"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              name="physicalAddress"
              label="Physical address"
              value={physicalAddress}
              onChange={(e) => setPhysicalAddress(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              name="dot"
              label="DOT"
              value={dot}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = parseFloat(value);
                if (value.trim() === "") {
                  setDot("");
                } else if (!isNaN(numericValue)) {
                  setDot(`${numericValue}`);
                }
              }}
              margin="normal"
            />
            <TextField
              fullWidth
              name="powerUnits"
              label="Power units"
              value={powerUnits}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = parseFloat(value);
                if (value.trim() === "") {
                  setPowerUnits("");
                } else if (!isNaN(numericValue)) {
                  setPowerUnits(`${numericValue}`);
                }
              }}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={allDates.updatedAllDates}
                  onChange={() => handleAllDatesChange("updatedAllDates")}
                />
              }
              label="All Modified DT"
            />
            {!allDates.updatedAllDates && (
              <DatePicker
                label="Modified DT"
                value={modifiedDT}
                onChange={(date) => setModifiedDT(date)}
              />
            )}

            <FormControl fullWidth margin="normal">
              <InputLabel>Operating status</InputLabel>
              <Select name="operatingStatus" value={operatingStatus}>
                {statusOptions.map((option) => (
                  <MenuItem
                    key={option}
                    value={option}
                    onClick={(e) => handleSelectOperatingStatus(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              name="dbaName"
              label="DBA name"
              value={dbaName}
              onChange={(e) => setDbaName(e.target.value)}
              margin="normal"
            />

            <ReactInputMask
              mask="(999) 999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            >
              {
                // @ts-ignore
                () => {
                  return (
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone"
                      margin="normal"
                    />
                  );
                }
              }
            </ReactInputMask>

            <TextField
              fullWidth
              name="mcMxFF"
              label="MC/MX/FF"
              margin="normal"
              value={mcMxFF}
              onChange={(e) => setMcMxFF(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={allDates.outOfServiceDate}
                  onChange={() => handleAllDatesChange("outOfServiceDate")}
                />
              }
              label="All out of service date"
            />
            {!allDates.outOfServiceDate && (
              <DatePicker
                label="Out of service date"
                value={outOfServiceDate}
                onChange={(date) => setOutOfServiceDate(date)}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography
              component="span"
              variant="body2"
              color="primary"
              sx={{
                marginRight: 2,
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={handleShowAll}
            >
              Show All
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPage(1);
                handleSearch(true);
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsModalOpen(false)}
              sx={{ marginLeft: 2 }}
            >
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
