import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

// note: screens live in ../screen (singular) per your project
import AddEditNoteScreen from "../screen/AddEditNoteScreen";
import CategoriesScreen from "../screen/CategoriesScreen";
import LoginScreen from "../screen/LoginScreen";
import NotesScreen from "../screen/NotesScreen";
import ProfileScreen from "../screen/ProfileScreen";
import RegisterScreen from "../screen/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(AuthContext)!;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Categories" component={CategoriesScreen} />
          <Stack.Screen name="Notes" component={NotesScreen} />
          <Stack.Screen name="AddEditNote" component={AddEditNoteScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
