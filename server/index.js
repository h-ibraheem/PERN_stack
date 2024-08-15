const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db')


//midllware
app.use(cors());
app.use(express.json());//req.body

//ROUTES//

//create a todo

app.post('/todos', async (req, res)=>{
    try {
        const{ description }= req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *', [description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

//get all todo
app.get ('/todos', async(req, res)=>{
    try {
        const allTodos = await pool.query(
            'SELECT * FROM todo'
        )
        res.json(allTodos.rows);

    } catch (err) {
        console.error(err.message)
        
    }
})

// get todo

app.get('/todos/:id',async (req, res)=>{
    try {
        const id = req.params.id;
        const todo = await pool.query('SELECT * FROM todo WHERE TODO_ID = $1', [id]);
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


// update todo

app.put('/todos/:id', async(req, res)=>{
    try {
        const id = req.params.id;
        const {description} = req.body;

        const todoUpdate = await pool.query(
          "UPDATE todo SET description = $1 WHERE todo_id = $2",
          [description, id]
        );
        res.json("description updated ...");
    } catch (err) {
        console.error(err.message)        
    }
})


// delete todo
app.delete('/todos/:id', async (req, res)=>{
    const id = req.params.id;
    const deleteTodo = await pool.query(
        "delete from todo where todo_id = $1", [id]
    );
    res.json('todo deleted ... ')
})


const port = process.env.port || 5000;
app.listen(port, ()=>{
    console.log(` server running on port ${port}`);
})
 
