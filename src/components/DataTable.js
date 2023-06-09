import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import styles from "./styles";


function DataTable({ csvData = [] , onDeleteRow, onEditRow }) {
  return (
    <Table style={styles.table}>
      {csvData && csvData.length > 0 && (
        <>
          <TableHead>
            <TableRow>
              {csvData[0].map((column, i) => (
                <TableCell key={i}>{column}</TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {csvData.slice(1).map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, i) => (
                  <TableCell key={i}>{cell}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => onDeleteRow(i + 1)}>
                    <Delete color="error" />
                  </IconButton>
                  <IconButton onClick={() => onEditRow(row, i + 1)}>
                    <Edit color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </>
      )}
    </Table>
  );
}

export default DataTable;
