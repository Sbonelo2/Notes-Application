import { useContext } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../AuthContext";

export default function CategoriesScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const categories = [
    { name: "Work", icon: "💼", color: "#007AFF" },
    { name: "Study", icon: "📚", color: "#34C759" },
    { name: "Personal", icon: "👤", color: "#FF9500" },
  ];

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Logout",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes Categories</Text>
        <Text style={styles.subtitle}>Welcome, {user?.username}!</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.categoryCard}
            onPress={() => navigation.navigate("Notes", { category: category.name })}
          >
            <View style={styles.categoryContent}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </View>
            <Text style={styles.categoryArrow}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.profileButtonText}>My Profile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#007AFF",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftWidth: 4,
    borderLeftColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  categoryArrow: {
    fontSize: 20,
    color: "#666",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  profileButton: {
    backgroundColor: "#34C759",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  profileButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
