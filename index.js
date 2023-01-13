const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const { response } = require("express");

const app = express();

app.use(express.json());

const jsonPath = path.resolve('./file/tasks.json');




app.get('/tasks', async (req, res) => {
  const jsonFile = await fs.readFile(jsonPath, 'utf8');
  res.send(jsonFile);
});

app.post('/tasks', async (req, res) => {
  const task = req.body;
  const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

  const lastIndex = taskArray.length - 1;
  const newId = taskArray(lastIndex).id + 1;
  taskArray.push({...task, id: newId}); 

  await fs.writeFile(jsonPath, JSON.stringify(taskArray));
  res.end();
})

// actualizacion de tareas

app.put('/tasks', async (req, res) => {
  const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const { title, description, status, id} = req.body;
  const taskIndex = taskArray.findIndex(task => task.id === id );
  if(taskIndex >= 0) {
    taskArray[taskIndex].title = title;
    taskArray[taskIndex].description = description;
    taskArray[taskIndex].status = status;
  }

  await fs.writeFile(jsonPath, JSON.stringify(taskArray));
  res.send('usuario actalizdos');

})

app.delete('/tasks', async (req, res) => {
  const taskArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const { id } = req.body;
  const taskIndex = taskArray.findIndex(task => task.id === id );

  taskArray.splice(taskIndex, 1);

  await fs.writeFile(jsonPath, JSON.stringify(taskArray));
  response.end();

})

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`servidor escuchando en popuerto ${PORT}`);
})
