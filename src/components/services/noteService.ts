import axios from "axios";
import type { Note } from "../../types/note";

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  searchText: string,
  page: number,
  perPage: number,
) => {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: {
      search: searchText,
      page,
      perPage,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const createNote = async (
  newNote: Pick<Note, "title" | "content" | "tag">,
) => {
  const { data } = await axios.post<Note>("/notes", newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
