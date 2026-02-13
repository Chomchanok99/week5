const express = require("express");
const app = express();
const PORT = 3000;

// ใช้ middleware สำหรับอ่าน JSON body
app.use(express.json());

// ข้อมูลนักศึกษาเริ่มต้น
let students = [
  { id: 1, name: "node", age: 18 },
  { id: 2, name: "express", age: 19 },
  { id: 3, name: "javascript", age: 20 },
];

function validateStudent(req, res, next) {
  const { name, age } = req.body;

  // ถ้าไม่มี name หรือ age ให้ส่ง error 400
  if (!name || !age) {
    return res.status(400).json({ message: "Invalid data" });
  }

  next(); // ผ่านแล้วไปทำงานต่อที่ route handler
}


// GET /students (ดูนักศึกษาทั้งหมด)
app.get("/students", (req, res) => {
  res.json(students);
});

// GET /students/:id (ดูนักศึกษาตาม id)
app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

// POST /students (เพิ่มนักศึกษาใหม่)ใช้ validateStudent
app.post("/students", validateStudent, (req, res) => {
  const { name, age } = req.body;

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    age,
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id (แก้ไขข้อมูล)
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age } = req.body;

  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  // อัปเดตค่า
  student.name = name ?? student.name;
  student.age = age ?? student.age;

  res.json(student);
});

// DELETE /students/:id (ลบข้อมูล)
app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students.splice(index, 1);
  res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
