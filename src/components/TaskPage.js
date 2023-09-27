import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";

import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function TaskPage() {
  const [comp, setComp] = React.useState([]);
  const [pending, setPending] = React.useState([]);
  const [task, setTask] = React.useState();

  //GET ALL COPLETE TASK
  const completedTask = () => {
    fetch("http://localhost:8080/api/taskgo/true")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComp(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //GET ALL PENDING TASK
  const pendingTask = () => {
    fetch("http://localhost:8080/api/taskgo/false")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPending(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Delete with fetchAPI
  const deletePost = async (id) => {
    let response = await fetch(
       `http://localhost:8080/api/taskgo/${id}`,
       {
          method: 'DELETE',
       }
    );
    if (response.status === 200) {     
       completedTask();
       pendingTask();
    } else {
       return;
    }
 };

 // UPDATE with fetchAPI
   
   const updateStatus= async (id) => {
    let response = await fetch(
       `http://localhost:8080/api/taskgo/${id}`,
       {
          method: 'PUT',
       }
    );
    if (response.status === 200) {     
       completedTask();
       pendingTask();
    } else {
       return;
    }
 };

 // ...
 //ADD TASK
 // ...
const addTask = async (task) => {
  await fetch('http://localhost:8080/api/taskgo', {
     method: 'POST',
     body: JSON.stringify({
        title: task,        
     }),
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
  })
     .then((response) => response.json())
     .then((data) => {
        
        pendingTask();
        
     })
     .catch((err) => {
        console.log(err.message);
     });
};


const handleSubmit = () => {  
  addTask(task);
  completedTask();
  pendingTask();
  setTask("");
};  

  React.useEffect(() => {
    completedTask();
    pendingTask();
    
  }, []);

  return (
    <>
      <Container >
        <Box sx={{ flexGrow: 1 }} elevation={5}>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
            
              <Paper component="form" sx={{p: "2px 4px",display: "flex",alignItems: "center", height:'10vh'}}>
              
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="New Task.."

                  value={task}
                  onChange={(e) => setTask(e.target.value)}

                />
              
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  color="primary"
                  sx={{ p: "10px" }}
                  aria-label="directions"
                >
                  <Button onClick={() => handleSubmit()}><AddIcon /></Button>
                </IconButton>
              </Paper>
            
            </Grid>
          </Grid>
        </Box>
      </Container>
    
    
      <Container>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={16} md={10}>
            <h4>Pending Task</h4>
            {pending.map((task) => {
              return (
                <Paper sx={{ p: 2, margin: "auto", flexGrow: 1, mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {task.title}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {task.created_at}
                          <Button size="small" onClick={() => updateStatus(task.id)} ><CheckIcon /></Button>
                          <Button size="small" onClick={() => deletePost(task.id)}><DeleteOutlineIcon /></Button>
                        </Typography>                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              );
            })}
          </Grid>
          <Grid item xs={16} md={6}>
            <h4>Completed Task</h4>
            {comp.map((task) => {
              return (
                <Paper sx={{ p: 2, margin: "auto", flexGrow: 1, mt: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {task.title}
                          </Typography>
                        </Grid>
                        <Grid item xs>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {task.created_at}
                          <Button size="small" onClick={() => updateStatus(task.id)} ><CheckIcon /></Button>
                          <Button size="small" onClick={() => deletePost(task.id)}><DeleteOutlineIcon /></Button>
                        </Typography>                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>

              );
            })}
            
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
