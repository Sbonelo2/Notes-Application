import { createContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import { Note, NotesContextType } from "../types";
import { getData, saveData } from "./utils/storage";

export const NotesContext = createContext<NotesContextType | null>(null);

export default function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getData<Note[]>("notes").then((data) => data && setNotes(data));
  }, []);

  const persist = (data: Note[]) => {
    setNotes(data);
    saveData("notes", data);
  };

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    persist([
      ...notes,
      {
        id: uuid.v4(),
        ...note,
        createdAt: new Date().toISOString(),
        updatedAt: undefined,
      },
    ]);
  };

  const updateNote = (id: string, updatedNote: Partial<Pick<Note, 'title' | 'notes'>>) => {
    persist(
      notes.map((n) =>
        n.id === id
          ? { ...n, ...updatedNote, updatedAt: new Date().toISOString() }
          : n
      )
    );
  };

  const deleteNote = (id: string) => {
    persist(notes.filter((n) => n.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
}
