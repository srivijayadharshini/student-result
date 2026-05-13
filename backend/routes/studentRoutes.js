const express = require('express');

const router = express.Router();

const Student = require('../models/Student');


// Function to calculate percentage and grade
const calculateResult = (marks) => {

  const total =
    marks.math +
    marks.science +
    marks.english;

  const percentage = total / 3;

  let grade = 'F';

  if (percentage >= 90) {
    grade = 'A+';
  }

  else if (percentage >= 80) {
    grade = 'A';
  }

  else if (percentage >= 70) {
    grade = 'B';
  }

  else if (percentage >= 60) {
    grade = 'C';
  }

  else if (percentage >= 50) {
    grade = 'D';
  }

  return {
    percentage,
    grade,
  };
};



// ADD STUDENT
router.post('/add', async (req, res) => {

  try {

    const {
      name,
      rollNumber,
      department,
      marks,
    } = req.body;

    const result = calculateResult(marks);

    const student = new Student({
      name,
      rollNumber,
      department,
      marks,
      percentage: result.percentage,
      grade: result.grade,
    });

    await student.save();

    res.status(201).json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});



// GET ALL STUDENTS
router.get('/', async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});



// GET STUDENT BY ROLL NUMBER
router.get('/:rollNumber', async (req, res) => {

  try {

    const student = await Student.findOne({
      rollNumber: req.params.rollNumber,
    });

    if (!student) {

      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.json(student);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});



// UPDATE STUDENT
router.put('/:id', async (req, res) => {

  try {

    const result = calculateResult(req.body.marks);

    const updatedStudent =
      await Student.findByIdAndUpdate(

        req.params.id,

        {
          ...req.body,
          percentage: result.percentage,
          grade: result.grade,
        },

        {
          new: true,
        }
      );

    res.json(updatedStudent);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});



// DELETE STUDENT
router.delete('/:id', async (req, res) => {

  try {

    await Student.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: 'Student deleted successfully',
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;