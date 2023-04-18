import * as React from "react";
import { API } from "../../../api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const DialogDelete = ({ id, tai }) => {
  // Dialog Open & Close Functionality
  const [open, setOpen] = React.useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/admin-books/delete/${id}`);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("Delete Success");
    }
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Delete">
          <DeleteForeverIcon />
        </Tooltip>
      </IconButton>

      <Dialog open={open}>
        <DialogTitle>Delete This Book</DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure want to delete the <b>{`"${tai}"`}</b>?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogDelete;
