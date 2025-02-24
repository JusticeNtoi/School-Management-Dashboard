type RouteAccessMap = {
  [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
  "/admin(.*)": ["admin"],
  "/teacher(.*)": ["teacher"],
  "/student(.*)": ["student"],
  "/parent(.*)": ["parent"],
  "/list/teachers": ["admin", "teacher"],
  "/list/students": ["admin", "teacher"],
  "/list/parents": ["admin", "teacher"],
  "/list/lessons": ["admin", "teacher"],
  "/list/subjects": ["admin"],
  "/list/classes": ["admin"],
  "/list/exams": ["admin", "teacher", "student", "parent"],
  "/list/assignments": ["admin", "teacher", "student", "parent"],
  "/list/results": ["admin", "teacher", "student", "parent"],
  "/list/attendance": ["admin", "teacher", "student", "parent"],
  "/list/events": ["admin", "teacher", "student", "parent"],
  "/list/announcements": ["admin", "teacher", "student", "parent"],
};
