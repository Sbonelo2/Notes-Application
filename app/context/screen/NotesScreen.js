import React, { useContext, useState } from "react";
import { View, TextInput, FlatList, Button, Text } from "react-native";
import { NotesContext } from "../context/NotesContext";

export default function NotesScreen({ route, navigation }) {
  const { notes } = useContext(NotesContext);
  const { category } = route.params;
  const [search, setSearch] = useState("");
  const [asc, setAsc] = useState(true);

  const filtered = notes
    .filter((n) => n.category === category)
    .filter((n) => n.notes.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      asc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <View>
      <TextInput placeholder="Search" onChangeText={setSearch} />
      <Button title="Sort" onPress={() => setAsc(!asc)} />
      <Button
        title="Add Note"
        onPress={() => navigation.navigate("AddEditNote", { category })}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            onPress={() => navigation.navigate("AddEditNote", { note: item })}
          >
            {item.title || "Untitled"}
          </Text>
        )}
      />
    </View>
  );
}
