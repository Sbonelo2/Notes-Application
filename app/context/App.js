import AuthProvider from "./AuthContext";
import NotesProvider from "./NotesContext";
import AppNavigator from "./navigation/AppNavigator";
import React from 'react';

export default function App() {
  return (
    <AuthProvider>
      <NotesProvider>
        <AppNavigator />
      </NotesProvider>
    </AuthProvider>
  );
}
