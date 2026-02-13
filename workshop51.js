const express = require('express');
const app = express();
const PORT = 3000;

// ใช้ middleware สำหรับอ่าน JSON
app.use(express.json());

// ข้อมูลนักศึกษาเริ่มต้น
let students = [
    { id: 1, name: "node", age: 18 },
    { id: 2, name: "express", age: 19 },
    { id: 3, name: "javascript", age: 20 }
];

// GET /students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET /students/:id
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// POST /students
app.post('/students', (req, res) => {
    const { name, age } = req.body;

    const newStudent = {
        id: students.length + 1,
        name,
        age
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT /students/:id
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age } = req.body;

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    student.name = name;
    student.age = age;

    res.json(student);
});

// DELETE /students/:id
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
