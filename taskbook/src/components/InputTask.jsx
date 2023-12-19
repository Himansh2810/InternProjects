import React, { useState } from "react";
import styled from "styled-components";

function InputTask({ refreshList }) {
  const addTask = () => {
    document.getElementById("add-btn").textContent = "Add Task";
    const val = document.getElementById("text-in").value;

    if (val === "") {
      alert(" Text field can't be empty . Please enter task. ");
    } else {
      const completed_task = false;
      const date = new Date();
      let hrs = date.getHours(),
        mins = date.getMinutes(),
        sec = date.getSeconds();

      mins < 10 ? (mins = ":0" + mins) : (mins = ":" + mins);
      sec < 10 ? (sec = ":0" + sec) : (sec = ":" + sec);

      const task_id = date.toLocaleDateString() + "  " + hrs + mins + sec;
      const Task = {
        content: val,
        completed: completed_task,
        addedTime: task_id,
      };

      localStorage.setItem(task_id, JSON.stringify(Task));

      refreshList();

      document.getElementById("text-in").value = "";
    }
  };

  const deleteAllTask = () => {
    if (window.confirm("Are you sure want to delete all Tasks ? ")) {
      localStorage.clear();
      refreshList();
    }
  };

  return (
    <>
      <Container>
        <h2>Write Task here : </h2>
        <textarea
          placeholder="Enter your Task here"
          id="text-in"
          cols={40}
          rows={5}
        ></textarea>
        <button onClick={addTask} id="add-btn">
          Add Task
        </button>
        <button onClick={deleteAllTask} id="delAll-btn">
          Delete All Task
        </button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  #text-in {
    border-radius: 0.7rem;
    font-size: 1.2rem;
    border: 3px solid black;
    margin: 1rem;
  }
  #add-btn,
  #delAll-btn {
    width: 10rem;
    height: 3rem;
    background-color: cadetblue;
    color: rgb(13, 6, 63);
    margin: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.2rem;
  }
`;

export default InputTask;
