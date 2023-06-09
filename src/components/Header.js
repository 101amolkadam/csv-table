import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import { Typography, TextField, Button } from "@mui/material";
import { CSVLink } from "react-csv";

import styles from "./styles";

function Header({ onFileChange, csvData, originalData, onFilter }) {
  const [userInput, setUserInput] = useState("");
  const [fileName, setFileName] = useState("data.csv");

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const filterData = () => {
    if (userInput.length >= 3) {
      const regex = new RegExp(userInput, "i");
      const filteredData = csvData.filter(
        (item) => regex.test(item[0]) || regex.test(item[1])
      );
      onFilter(filteredData);
    } else {
      onFilter(originalData);
    }
  };

  return (
    <>
      <Typography variant="h4" style={styles.title}>
        CSV Data Table
      </Typography>
      <CSVReader
        inputId="csvFileInput"
        inputStyle={styles.fileInput}
        onFileLoaded={(data, fileInfo) => {
          onFileChange(data, fileInfo);
          setFileName(fileInfo.name);
        }}
      />
      <TextField
        label="Part"
        variant="outlined"
        value={userInput}
        onChange={handleInputChange}
        style={styles.input}
      />
      <Button variant="contained" color="primary" onClick={filterData} style={styles.filterButton}>
        Filter
      </Button>
      <CSVLink data={csvData} filename={fileName}>
        <Button variant="contained" color="secondary" style={styles.exportButton}>
          Export CSV
        </Button>
      </CSVLink>
    </>
  );
}

export default Header;
