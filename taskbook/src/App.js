import React, { useState, useEffect } from "react";
import InputTask from "./components/InputTask";
import styled from "styled-components";
import DispTask from "./components/DispTask";

function App() {
  const [taskList, setTaskList] = useState([]);
  const [sortBy, setSortBy] = useState("all");

  useEffect(() => {
    preSet();
  }, []);

  // useEffect(() => {
  //   console.log(taskList);
  // }, [taskList]);

  const preSet = () => {
    const items = { ...localStorage };
    const result = Object.entries(items);
    setTaskList(result);
  };

  const sortTasks = () => {
    const sel = document.getElementById("sort-opt").value;
    setSortBy(sel);
    preSet();
  };

  return (
    <>
      <h1 style={{ margin: "1rem" }}>TaskBook</h1>
      <InputTask refreshList={preSet} />
      <TaskListHeader>
        <h1>List of All Tasks</h1>
        <select id="sort-opt" onChange={sortTasks}>
          <option value="all">Sort Tasks - All</option>
          <option value={true}>Completed Tasks</option>
          <option value={false}>Incompleted Tasks</option>
        </select>
      </TaskListHeader>
      <TaskContainer>
        {taskList.map((task) => {
          return sortBy === "all" ? (
            <DispTask key={task[0]} task={task} refreshList={preSet} />
          ) : sortBy === JSON.parse(task[1]).completed.toString() ? (
            <DispTask key={task[0]} task={task} refreshList={preSet} />
          ) : (
            <></>
          );
        })}
      </TaskContainer>
      <Footer>
        <div></div>
        <label id="lb1">Added At </label>
        <label id="lb2">Task</label>
      </Footer>
    </>
  );
}

const TaskContainer = styled.div`
  margin: 0.5rem;
  height: 35rem;
  border-bottom: 3px solid rgb(13, 6, 65);
  border-top: 3px solid rgb(13, 6, 65);
  border-radius: 0.3rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.75rem;
    background-color: cadetblue;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(13, 6, 65);
  }
`;

const TaskListHeader = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin: 1rem;
  }

  select {
    margin: 1rem;
    width: 10rem;
    height: 3rem;
    background-color: cadetblue;
    color: rgb(13, 6, 65);
    font-size: 1.2rem;
    border: none;
    border-radius: 0.5rem;
  }
`;

const Footer = styled.div`
  display: grid;
  grid-template-columns: 14% 18% 16% 52%;
  align-items: center;

  label {
    color: white;
    font-size: 1.8rem;
    width: 10rem;
    height: 3rem;
    background-color: rgb(13, 6, 65);
    text-align: center;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  div {
    grid: 1/2;
  }

  #lb1 {
    grid: 2/3;
  }

  #lb2 {
    grid: 3/4;
  }
`;
export default App;
