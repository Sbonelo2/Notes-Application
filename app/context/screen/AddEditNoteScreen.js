import { useContext, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { NotesContext } from "../NotesContext";

export default function AddEditNoteScreen({ route, navigation }) {
  const { addNote, updateNote, deleteNote } = useContext(NotesContext);
  const note = route.params?.note;
  const category = route.params?.category;

  const [title, setTitle] = useState(note?.title || "");
  const [notes, setNotes] = useState(note?.notes || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!notes.trim()) {
      Alert.alert("Error", "Please enter some content for your note");
      return;
    }

    setLoading(true);
    try {
      if (note) {
        await updateNote(note.id, { title, notes });
        Alert.alert("Success", "Note updated successfully");
      } else {
        await addNote({ title, notes, category });
        Alert.alert("Success", "Note created successfully");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note? This action cannot be undone.",
      [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Delete",
          onPress: () => {
            deleteNote(note.id);
            navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  const isEditing = !!note;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {isEditing ? "Edit Note" : "Create New Note"}
          </Text>
          {category && (
            <Text style={styles.categoryText}>Category: {category}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title (Optional)</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Enter note title..."
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note Content *</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Write your note here..."
              placeholderTextColor="#999"
              value={notes}
              onChangeText={setNotes}
              multiline
              textAlignVertical="top"
              editable={!loading}
            />
            <Text style={styles.characterCount}>
              {notes.length} characters
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? "Saving..." : isEditing ? "Update Note" : "Save Note"}
            </Text>
          </TouchableOpacity>

          {isEditing && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              disabled={loading}
            >
              <Text style={styles.deleteButtonText}>Delete Note</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
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
  categoryText: {
    fontSize: 14,
    color: "#fff",
    opacity: 0.9,
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  contentInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    minHeight: 200,
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  saveButton: {
    backgroundColor: "#34C759",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
