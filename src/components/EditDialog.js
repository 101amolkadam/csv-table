import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@mui/material";


import styles from "./styles";

function EditDialog({ dialogData, onCloseDialog, setDialogData }) {
  const handleDialogInputChange = (e, column) => {
    const newDialogData = { ...dialogData };
    newDialogData.row[column] = e.target.value;
    setDialogData(newDialogData);
  };

  const updateRow = () => {
    const newData = [...dialogData.csvData];
    newData[dialogData.index] = dialogData.row;
    setDialogData({
      ...dialogData,
      csvData: newData,
      open: false
    });
  };

  return (
    <Dialog open={dialogData.open} onClose={onCloseDialog}>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent style={styles.dialog}>
        {dialogData.row.slice(0, -1).map((cell, i) => (
          <TextField
            key={i}
            label={dialogData.csvData[0][i]}
            variant="outlined"
            value={cell}
            onChange={(e) => handleDialogInputChange(e, i)}
            fullWidth
            margin="normal"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseDialog}>Cancel</Button>
        <Button onClick={updateRow} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditDialog;
