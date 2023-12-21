import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export default function Home({ setNote }) {
  const [token, setToken] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isTextVisibile, setIsTextVisible] = useState(false);
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
    if (res.data.length === 0) {
      setIsTextVisible(true);
    }
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
    <div style={{ margin: "5em 0" }}>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          {notes.length !== 0 &&
            notes.map((note) => (
              <Grid item key={note._id} xs={12} md={6} lg={4}>
                <Card>
                  <CardHeader
                    title={note.title}
                    titleTypographyProps={{ align: "center" }}
                    sx={{
                      backgroundColor: "#689bce",
                    }}
                  />
                  <CardContent sx={{ minHeight: "100px" }}>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      key={note._id}
                    >
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
          {isTextVisibile && (
            <Typography
              sx={{
                margin: "2em auto",
              }}
            >
              Your notes is Empty.&nbsp;
              <Link
                to="/note"
                onClick={() => {
                  setNote(null);
                  localStorage.removeItem("note");
                }}
              >
                Create
              </Link>
              &nbsp;a note to see the list
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}
