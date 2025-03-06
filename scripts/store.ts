import { ref } from "vue";
import { Members } from "./types";

export const members = ref<Members>({
  researchers: [],
  phdStudents: [],
  msStudents: [],
  undergradStudents: [],
  staff: [],
  alumni: []
});