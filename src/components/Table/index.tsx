"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Button, Typography } from "@mui/material";
import { useAppContext } from "@/store/appContext";

export default function EntityTable() {
  const {
    setPage,
    setRowsPerPage,
    renderedCompanies,
    setIsModalOpen,
    totalCompanies,
    rowsPerPage,
    page,
  } = useAppContext();

  const handleChangePage = (event: any, newPage: any) => {
    if (newPage === 0) return;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ margin: 16 }}
      >
        New Search
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Created_DT
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Modified_DT
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Entity
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Operating Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Legal Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                DBA Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Physical Address
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                DOT
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                MC/MX/FF
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Power Units
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Out of Service Date
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {renderedCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} style={{ textAlign: "center" }}>
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {renderedCompanies.map((row: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{row.createdDT}</TableCell>
                    <TableCell>{row.modifiedDT}</TableCell>
                    <TableCell>{row.entity}</TableCell>
                    <TableCell>{row.operatingStatus}</TableCell>
                    <TableCell>{row.legalName}</TableCell>
                    <TableCell>{row.dbaName}</TableCell>
                    <TableCell>{row.physicalAddress}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.dot}</TableCell>
                    <TableCell>{row.mcmxff}</TableCell>
                    <TableCell>{row.powerUnits}</TableCell>
                    <TableCell>{row.outOfServiceDate}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCompanies}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
