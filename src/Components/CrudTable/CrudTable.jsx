import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LockResetIcon from '@mui/icons-material/LockReset';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { useState } from "react";

const CrudTable = ({
  data,
  fetchData,
  setValidationErrors,
  columns,
  crud_url,
  validateData,
}) => {
  const [isLoadingDataError, setIsLoadingDataError] = useState(false);

  const createData = async (values) => {
    const response = await axios.post(crud_url, values);
    fetchData();
  };

  const updateData = async (values, row) => {
    const response = await axios.put(`${crud_url}${row.original.id}/`, values);
    fetchData();
  };

  const deleteData = async (id) => {
    const response = await axios.delete(`${crud_url}${id}/`);
    fetchData();
  };

  const handleCreateData = async ({ values, table }) => {
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    createData(values);
    table.setCreatingRow(null);
  };

  const handleSaveData = async ({ values, row, table }) => {
    console.log(row)
    const newValidationErrors = validateData(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    updateData(values, row);
    table.setEditingRow(null);
  };

  const ResetPassword = async (row) => {
    const access_token = localStorage.getItem("access_token");
    const url = 'http://127.0.0.1:8001/api/ResetPassword/';
    const data = {
      username: row.original.username,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(data)
        
      });
      console.log(JSON.stringify(data));
      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }
      const result = await response.json();
      
    } catch (error) {
      console.error('Il y a eu une erreur !', error);
    }
  };
    

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ces données ?")) {
      deleteData(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: data,
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingDataError
      ? {
          color: "error",
          children: "Erreur lors du chargement des données",
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateData,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveData,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Créer Nouvelles Données</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Modifier Données</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {row.original.role !== "technicien" ? internalEditComponents.splice(-2) : null}
          {internalEditComponents}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Modifier">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Réinitialiser mot de passe">
          <IconButton>
            <LockResetIcon onClick={() => ResetPassword(row)} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Supprimer">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Créer Nouvelles Données
      </Button>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default CrudTable;
