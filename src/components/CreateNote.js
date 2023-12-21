import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import { Box, Button, TextField } from "@mui/material";
import { baseURL } from "../utils";
import axios from "axios";

export default function CreateNote({ note, setNote }) {
  const [token, setToken] = useState("");
  const [isCreate, setIsCreate] = useState(true);
  const [isBtnEnabled, setIsBtnEnabled] = useState(false);
  const navigate = useNavigate();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    const noteFromLS = localStorage.getItem("note");
    if (noteFromLS) {
      setNote(JSON.parse(noteFromLS));
    }
    setIsCreate(!Boolean(note));
    const tokenFromLS = localStorage.getItem("token");
    setToken(tokenFromLS);

    if (titleRef && titleRef.current) {
      titleRef.current.value = note?.title || "";
    }
    if (descriptionRef && descriptionRef.current) {
      descriptionRef.current.value = note?.description || "";
    }
  }, [note?._id]);

  useEffect(() => {
    if (note?.title && note?.description) {
      setIsBtnEnabled(true);
    } else {
      setIsBtnEnabled(false);
    }
  }, [note?.title, note?.description]);

  const handleTitleChange = (event) => {
    setNote({
      ...note,
      title: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setNote({
      ...note,
      description: event.target.value,
    });
  };

  const createNote = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      await axios.post(
        `${baseURL}/notes`,
        {
          title: note?.title,
          description: note?.description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      navigate("/");
      setNote(null);
      setIsCreate(false);
    }
    try {
    } catch (err) {
      window.location.href = "/";
    }
  };

  const updateNote = async () => {
    try {
      await axios.put(
        `${baseURL}/notes/${note._id}`,
        {
          title: note?.title,
          description: note?.description,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      localStorage.removeItem("note");
      setNote(null);
      navigate("/");
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            m: 3,
            width: "80%",
            minWidth: "300px",
            maxWidth: "600px",
          }}
        >
          <CardContent>
            <Box sx={{ backgroundColor: "#1976d2" }}>
              <TextField
                placeholder="Title......"
                fullWidth
                maxRows={2}
                inputRef={titleRef}
                onChange={handleTitleChange}
              />
            </Box>
            <Box sx={{ mt: "1em" }}>
              <TextField
                placeholder="Description......"
                fullWidth
                multiline
                rows={7}
                sx={{ overflow: "auto" }}
                inputRef={descriptionRef}
                onChange={handleDescriptionChange}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            {!isCreate ? (
              <Button
                sx={{
                  m: "0 1em 1em 0",
                  backgroundColor: "#1976d2",
                }}
                disabled={isBtnEnabled ? false : true}
                variant="contained"
                onClick={updateNote}
              >
                UPDATE
              </Button>
            ) : (
              <Button
                sx={{ m: "0 1em 1em 0", backgroundColor: "#1976d2" }}
                variant="contained"
                disabled={isBtnEnabled ? false : true}
                onClick={createNote}
              >
                CREATE
              </Button>
            )}
          </CardActions>
        </Card>
      </Container>
    </div>
  );
}
