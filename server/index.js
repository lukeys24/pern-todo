const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

// middlewar
app.use(cors());
app.use(express.json());    // gives us access to request.body

// Routes

// Create a todo

app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

// Get all todos
app.get('/todos', async (req,res) => {
    try {
         const todos = await pool.query("SELECT * FROM todo");
         res.json(todos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// Get a todo
app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
})

// Update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);

        res.json(updatedTodo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json('To do was deleted');
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log('server has started on port 5000');
}); 