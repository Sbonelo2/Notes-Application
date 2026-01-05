import AuthProvider from "./context/AuthContext";
import NotesProvider from "./context/NotesContext";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppNavigator />
      </NotesProvider>
    </AuthProvider>
  );
}
