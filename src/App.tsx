import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import s from './components/TodoList/TodoList.module.css'
import {v1} from 'uuid' 

export type FilterValuesType = 'all' | 'active' | 'complited'

const App = () => {

  const [tasks, setTasks] = React.useState([
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: true},
    {id: v1(), title: 'ExpressJS', isDone: false},
    {id: v1(), title: 'Typescript', isDone: false},
    {id: v1(), title: 'HTML/CSS', isDone: true}
  ])

  const [filter, setFilter] = React.useState<FilterValuesType>('all')

  let tasksForTodolist = tasks;

  if(filter === 'active'){
    tasksForTodolist = tasks.filter((task) => task.isDone === false)
  }

  if(filter === 'complited'){
    tasksForTodolist = tasks.filter((task) => task.isDone === true)
  }

  
  const removeTask = (id: string) => {
    const changedTasks = tasks.filter((task) => task.id !== id)
    setTasks(changedTasks)
  }
  
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  const addTask = (value: string) => {
    const newTask = {id: v1(), title: value, isDone: false}
    setTasks([newTask, ...tasks])
  }

  // const changeTaskStatus = (taskID: string) => {
  //   let task = tasks.find((task) => task.id === taskID)
  //   if(task){
  //     task.isDone = !task.isDone
  //   }
  //   setTasks([...tasks])        // Не по правилам иммутабельности ?????
  // }


  const changeTaskStatus = (taskID: string) => {
    const copyTasks = [...tasks]
    let task = copyTasks.find((task) => task.id === taskID)
    if(task){
      task.isDone = !task.isDone
    }
    setTasks([...copyTasks])          // Здесь все-равно делается поверхностное копирование
  }

  return (
    <div className={s.app}>
      <TodoList 
      title='What to learn' 
      tasks={tasksForTodolist} 
      removeTask={removeTask}
      changeFilter={changeFilter}
      addTask={addTask}
      changeTaskStatus={changeTaskStatus}
      filter={filter}/>
    </div>
  );
}

export default App;