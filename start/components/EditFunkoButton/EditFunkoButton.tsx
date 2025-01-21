import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Funko, FunkoProps } from "../../types/funko";
import { EditFunkoProps } from "../../types/funko";
import axios from "axios";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const funkoSchema = z.object({
  character: z.string().min(1, "Character name must be at least 1 character"),
  imageUrl: z.string().url("Invalid URL"),
  numberInLine: z.number().int().min(1, "Number in line must be at least 1"),
  yearReleased: z.string().min(1, "Add year released"),
  source: z.string().min(1, "Source must be at least 1 character"),
});

type FunkoForm = z.infer<typeof funkoSchema>;
const EditFunkoButton = ({
  setFunkos,
  funko,
}: {
  setFunkos: React.Dispatch<React.SetStateAction<Funko[]>>;
  funko: Funko;
}) => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    _id: funko._id,
    imageUrl: funko.imageUrl,
    source: funko.source,
    character: funko.character,
    yearReleased: funko.yearReleased,
    numberInLine: funko.numberInLine,
  });

  const {
    control,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<FunkoForm>({
    resolver: zodResolver(funkoSchema),
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/update_funkos", formValues);
      setFunkos((funkos: Funko[]) => {
        return funkos.map((funko) => {
          if (funko._id === response.data._id) {
            return response.data;
          }
          return funko;
        });
      });
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
        Edit
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
            defaultValue={funko.character}
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
            defaultValue={funko.imageUrl}
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
            defaultValue={funko.source}
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
            defaultValue={funko.yearReleased}
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
            defaultValue={funko.numberInLine}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number in Line"
                error={!!errors.numberInLine}
                helperText={errors.numberInLine?.message}
                type="number"
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
    </div>
  );
};

export default EditFunkoButton;
