import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Funko } from "../../types/funko";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

const funkoCreateSchema = z.object({
  character: z.string().min(1, "Character name must be at least 1 character"),
  imageUrl: z.string().url("Invalid URL"),
  numberInLine: z.number().int().min(1, "Number in line must be at least 1"),
  yearReleased: z.string().min(1, "Add year released"),
  source: z.string().min(1, "Source must be at least 1 character"),
});

type FunkoFormCreateData = z.infer<typeof funkoCreateSchema>;
const AddFunkoButton = ({
  setFunkos,
}: {
  setFunkos: React.Dispatch<React.SetStateAction<Funko[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<FunkoFormCreateData>({
    resolver: zodResolver(funkoCreateSchema),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (data: FunkoFormCreateData) => {
    try {
      const response = await axios.post("/api/funkos", data);
      setFunkos((funkos: Funko[]) => [...funkos, response.data]);
      handleClose(); // Close the dialog after submission
    } catch (error) {
      console.error("Error adding Funko:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        Add Funko!
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component={"form"}
        onSubmit={formSubmit(handleSubmit)}
        fullWidth
      >
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
          }}
        >
          <Controller
            name="character"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                error={!!errors.character}
                helperText={errors.character?.message}
              />
            )}
          />
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Image URL"
                error={!!errors.imageUrl}
                helperText={errors.imageUrl?.message}
              />
            )}
          />
          <Controller
            name="source"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Source"
                error={!!errors.source}
                helperText={errors.source?.message}
              />
            )}
          />
          <Controller
            name="yearReleased"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Year Released"
                error={!!errors.yearReleased}
                helperText={errors.yearReleased?.message}
              />
            )}
          />
          <Controller
            name="numberInLine"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number in Line"
                error={!!errors.numberInLine}
                helperText={errors.numberInLine?.message}
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={formSubmit(handleSubmit)} color="success">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Code to create Add Button functionality goes here */}
    </div>
  );
};

export default AddFunkoButton;
