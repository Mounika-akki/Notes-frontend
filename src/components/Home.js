import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import { baseURL } from "../utils";

export default function Home() {
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("token");
    setToken(tokenFromLS);
    if (token) {
      getNotes(token);
    }
  }, [token]);

  const getNotes = async (token) => {
    const res = await axios.get(`${baseURL}/notes`, {
      headers: { Authorization: token },
    });
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${baseURL}/notes/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      getNotes(token);
    } catch (err) {
      window.location.href = "/";
    }
  };

  const editNote = (note) => {
    localStorage.setItem("note", JSON.stringify(note));
    navigate("/note");
  };

  return (
    <div style={{ margin: "2em 0" }}>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          {notes.map((note) => (
            <Grid item key={note._id} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={note.title}
                  titleTypographyProps={{ align: "center" }}
                  sx={{
                    // backgroundColor: "#bc5ec4",
                    backgroundColor: "#1976d2",
                  }}
                />
                <CardContent sx={{ minHeight: "100px" }}>
                  <Typography variant="subtitle1" align="center" key={note._id}>
                    {note.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    m: "0 5px",
                    p: "5px 10px",
                    borderTop: "1px solid #cedece",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <EditNoteIcon
                    sx={{
                      cursor: "pointer",
                      color: "#000000",
                      position: "relative",
                      top: "3px",
                    }}
                    onClick={() => editNote(note)}
                  />
                  <DeleteIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => deleteNote(note._id)}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
