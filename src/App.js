import React, { useState } from "react";
import { Container } from "@mui/material";

import Header from "./components/Header";
import DataTable from "./components/DataTable";
import EditDialog from "./components/EditDialog";

const styles = {
  container: {
    marginTop: 20,
    float: "left" 
  }
};

function App() {
  const [csvData, setCsvData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [dialogData, setDialogData] = useState({
    open: false,
    row: null,
    index: null,
    csvData: []
  });

  const handleFileChange = (data) => {
    if (data && data.length > 0) {
      const csvData = data;
      setCsvData(csvData);
      setOriginalData(csvData);
    }
  };

  const deleteRow = (index) => {
    const newData = [...csvData];
    newData.splice(index, 1);
    setCsvData(newData);
  };

  const openDialog = (row, index) => {
    setDialogData({
      open: true,
      row: row,
      index: index,
      csvData: csvData
    });
  };

  const closeDialog = () => {
    setDialogData({
      open: false,
      row: null,
      index: null,
      csvData: []
    });
  };

  // const updateRow = () => {
  //   const newData = [...dialogData.csvData];
  //   newData[dialogData.index] = dialogData.row;
  //   setDialogData({
  //     ...dialogData,
  //     csvData: newData,
  //     open: false
  //   });
  // };

  const updateFilteredData = (filteredData) => {
    setCsvData(filteredData);
  };

  return (
    <Container style={styles.container}>
      <Header onFileChange={handleFileChange} csvData={csvData} originalData={originalData} onFilter={updateFilteredData} />
      <DataTable csvData={csvData} onDeleteRow={deleteRow} onEditRow={openDialog} />
      {dialogData.row && (
        <EditDialog dialogData={dialogData} onCloseDialog={closeDialog} setDialogData={setDialogData} />
      )}
    </Container>
  );
}

export default App;
