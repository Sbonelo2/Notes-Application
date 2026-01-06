import { useContext, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { NotesContext } from "../NotesContext";

export default function NotesScreen({ route, navigation }) {
  const { notes } = useContext(NotesContext);
  const { category } = route.params;
  const [search, setSearch] = useState("");
  const [asc, setAsc] = useState(true);

  const filtered = notes
    .filter((n) => n.category === category)
    .filter((n) => {
      const searchLower = search.toLowerCase();
      return (
        n.notes.toLowerCase().includes(searchLower) ||
        (n.title && n.title.toLowerCase().includes(searchLower))
      );
    })
    .sort((a, b) =>
      asc
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt)
    );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDeleteNote = (noteId) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: () => {
            const { deleteNote } = useContext(NotesContext);
            deleteNote(noteId);
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate("AddEditNote", { note: item })}
    >
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>
          {item.title || "Untitled"}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteNote(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.noteContent} numberOfLines={3}>
        {item.notes}
      </Text>
      <View style={styles.noteFooter}>
        <Text style={styles.noteDate}>
          Created: {formatDate(item.createdAt)}
        </Text>
        {item.updatedAt && (
          <Text style={styles.noteDate}>
            Updated: {formatDate(item.updatedAt)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{category} Notes</Text>
        <Text style={styles.noteCount}>
          {filtered.length} {filtered.length === 1 ? "note" : "notes"}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search notes by title or content..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setAsc(!asc)}
        >
          <Text style={styles.sortButtonText}>
            Sort: {asc ? "Oldest First" : "Newest First"}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddEditNote", { category })}
        >
          <Text style={styles.addButtonText}>+ Add Note</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        renderItem={renderNote}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {search
                ? "No notes found matching your search."
                : "No notes in this category yet."}
            </Text>
            {!search && (
              <TouchableOpacity
                style={styles.emptyAddButton}
                onPress={() => navigation.navigate("AddEditNote", { category })}
              >
                <Text style={styles.emptyAddButtonText}>Create Your First Note</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  noteCount: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  controlsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
  },
  sortButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 1,
    marginRight: 10,
  },
  sortButtonText: {
    color: "#333",
    fontSize: 14,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#34C759",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  notesList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  noteContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 10,
  },
  noteFooter: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  noteDate: {
    fontSize: 12,
    color: "#999",
    marginBottom: 2,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyAddButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  emptyAddButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
