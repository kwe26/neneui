// Tiny in-memory store shared by interfaces/ and callbacks/.
// Swap for Prisma/MongoDB/SQLite when you want persistence.
export interface Task {
  id: number;
  title: string;
  subject: string;
  done: boolean;
}

let nextId = 4;

export const tasks: Task[] = [
  { id: 1, title: "Revise Chemical Reactions & Equations", subject: "Science", done: true },
  { id: 2, title: "Solve 10 Quadratic Equation problems", subject: "Maths", done: false },
  { id: 3, title: "Read Nationalism in India summary", subject: "Social Science", done: false },
];

export function addTask(title: string, subject: string) {
  tasks.unshift({ id: nextId++, title, subject: subject || "General", done: false });
}

export function toggleTask(id: number) {
  const t = tasks.find((x) => x.id === id);
  if (t) t.done = !t.done;
}

export function removeTask(id: number) {
  const i = tasks.findIndex((x) => x.id === id);
  if (i >= 0) tasks.splice(i, 1);
}

export function clearDone() {
  for (let i = tasks.length - 1; i >= 0; i--) if (tasks[i]!.done) tasks.splice(i, 1);
}
