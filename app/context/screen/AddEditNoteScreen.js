import React, { useContext, useState } from "react";
import { View, TextInput, Button } from "react-native";
import { NotesContext } from "../context/NotesContext";

export default function AddEditNoteScreen({ route, navigation }) {
  const { addNote, updateNote, deleteNote } = useContext(NotesContext);
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || "");
  const [notes, setNotes] = useState(note?.notes || "");

  const save = () => {
    note
      ? updateNote(note.id, { title, notes })
      : addNote({ title, notes, category: route.params.category });
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Button title="Save" onPress={save} />
      {note && (
        <Button
          title="Delete"
          onPress={() => {
            deleteNote(note.id);
            navigation.goBack();
          }}
        />
      )}
    </View>
  );
}
