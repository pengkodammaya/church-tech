export const ROOMS = [
  { id: "main-hall", name: "Main Hall", capacity: 200, description: "Worship services and large events" },
  { id: "function-room", name: "Function Room", capacity: 40, description: "Meetings, cell groups, workshops" },
  { id: "kitchen", name: "Kitchen", capacity: 10, description: "Food preparation for events" },
];

export const SLOTS = ["09:00-11:00", "11:00-13:00", "14:00-16:00", "16:00-18:00", "19:00-21:00"];

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}
