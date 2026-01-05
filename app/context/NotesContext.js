import React, { createContext, useState, useEffect } from "react";
import { saveData, getData } from "../utils/storage";
import uuid from "react-native-uuid";

export const NotesContext = createContext();

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getData("notes").then((data) => data && setNotes(data));
  }, []);

  const persist = (data) => {
    setNotes(data);
    saveData("notes", data);
  };

  const addNote = (note) => {
    persist([
      ...notes,
      {
        id: uuid.v4(),
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    ]);
  };

  const updateNote = (id, updatedNote) => {
    persist(
      notes.map((n) =>
        n.id === id
          ? { ...n, ...updatedNote, updatedAt: new Date().toISOString() }
          : n
      )
    );
  };

  const deleteNote = (id) => {
    persist(notes.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
