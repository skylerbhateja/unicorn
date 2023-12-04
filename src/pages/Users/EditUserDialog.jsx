import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const EditUserDialog = ({
  handleCloseDialog,
  open,
  data,
  handleUpdateUser,
}) => {
  const { handleSubmit, register, setValue } = useForm();

  const onSubmit = (value) => {
    const response = handleUpdateUser(value);
    if (response) {
      handleCloseDialog();
    }
  };

  useEffect(() => {
    setValue("id", data?.id);
    setValue("fullname", data?.fullname);
    setValue("email", data?.email);
    setValue("role", data?.role);
  }, [data]);

  return (
    <Dialog onClose={handleCloseDialog} fullWidth open={open}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Grid container direction={"column"} gap={2}>
          <Grid item flex={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Full Name"
              name="email"
              autoFocus
              {...register("fullname", { required: true })}
            />
          </Grid>
          <Grid item flex={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoFocus
              {...register("email", { required: true })}
            />
          </Grid>
          <Grid item flex={1}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              label="Role"
              name="role"
              autoFocus
              {...register("role", { required: true })}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justifyContent={"center"} gap={2}>
          <Button
            color="secondary"
            onClick={handleCloseDialog}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            Submit
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
