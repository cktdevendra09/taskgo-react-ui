import * as React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

export default function TaskForm() {
  return (
    <Container >
      <Box sx={{ flexGrow: 1 }} elevation={5}>
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12}>
            <Paper component="form" sx={{p: "2px 4px",display: "flex",alignItems: "center", height:'10vh'}}>
             
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="New Task.."/>
            
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <AddIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
