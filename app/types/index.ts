export interface User {
  email: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface Note {
  id: string;
  title?: string;
  notes: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  register: (email: string, username: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (email: string, username: string, password?: string | null) => Promise<void>;
}

export interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Pick<Note, 'title' | 'notes'>>) => void;
  deleteNote: (id: string) => void;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Categories: undefined;
  Notes: { category: string };
  AddEditNote: { note?: Note; category?: string };
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type NavigationProp<T extends keyof RootStackParamList> = {
  navigate: (screen: keyof RootStackParamList, params?: RootStackParamList[T]) => void;
  goBack: () => void;
};
