export type Member = {
  avatar: string;
  name: string;
  title: string;
  links: Array<{ icon: string; link: string }>;
  bio: string;
  role: string;
  link: string;
};

export type Members = {
  researchers: Member[];
  phdStudents: Member[];
  msStudents: Member[];
  undergradStudents: Member[];
  staff: Member[];
  alumni: Member[];
};