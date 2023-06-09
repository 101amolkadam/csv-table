import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import { Typography, TextField, Button } from "@mui/material";

const styles = {
  title: {
    marginBottom: 10
  },
  input: {
    marginRight: 10,
    marginTop: 10
  },
  filter: {
    marginTop: 17
  }
};

function Header({ onFileChange, csvData, originalData, onFilter }) {
  const [userInput, setUserInput] = useState("");
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
        inputStyle={{ color: "red" }}
        onFileLoaded={onFileChange}
      />
      <TextField
        label="User Input"
        variant="outlined"
        value={userInput}
        onChange={handleInputChange}
        style={styles.input}
      />
      <Button style={styles.filter} variant="contained" color="primary" onClick={filterData}>
        Filter
      </Button>
    </>
  );
}

export default Header;
