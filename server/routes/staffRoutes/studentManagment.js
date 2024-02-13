
// Endpoint to fetch all students
router.get('v0/students', validateToken, async (req, res) => {
    try {
        const students = await StudentManagementLogic.getStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to fetch a student by email
router.get('v0/student/:email', validateToken, async (req, res) => {
    const email = req.params.email;
    try {
        const student = await StudentManagementLogic.getStudentByEmail(email);
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to delete a student by id
router.delete('v0/student/:studentId', validateToken, async (req, res) => {
    const studentId = req.params.studentId;
    try {
        await StudentManagementLogic.deleteStudent(studentId);
        res.json({ message: 'Student deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint to update a student by email
router.put('v0/student/:email', validateToken, async (req, res) => {
    const email = req.params.email;
    const updatedData = req.body;
    try {
        const updatedStudent = await StudentManagementLogic.updateStudent(email, updatedData);
        res.json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});