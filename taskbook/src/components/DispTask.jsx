import React from "react";
import styled from "styled-components";

function DispTask({ task, refreshList }) {
  const data = JSON.parse(task[1]);

  const delTask = (key) => {
    localStorage.removeItem(key);
    refreshList();
  };

  const editTask = (key) => {
    document.getElementById("text-in").value = key.content;
    document.getElementById("text-in").focus();
    document.getElementById("add-btn").textContent = "Update Task";
    delTask(key.addedTime);
  };

  const updateTask = (data) => {
    const new_task = {
      content: data.content,
      completed: !data.completed,
      addedTime: data.addedTime,
    };

    localStorage.setItem(data.addedTime, JSON.stringify(new_task));
  };

  return (
    <>
      <Container>
        <input
          type="checkbox"
          id="tick"
          defaultChecked={data.completed}
          onChange={() => updateTask(data)}
        />
        <div id="time">{data.addedTime}</div>
        <div id="content">{data.content}</div>
        <button onClick={() => delTask(task[0])} id="del-task">
          Delete Task
        </button>
        <button onClick={() => editTask(data)} id="edit-task">
          Edit Task
        </button>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: cadetblue;
  border-radius: 2rem;
  margin: 1rem;
  #content {
    color: white;
    font-size: 1.5rem;
    width: 30rem;
    margin: 1rem;
    padding: 0.5rem;
  }

  #time {
    color: rgb(13, 6, 65);
    font-size: 1.2rem;
    margin: 1rem;
    padding: 0.5rem;
  }

  #tick {
    width: 2rem;
    height: 2rem;
    clip-path: circle(40% at 50% 50%);
    margin-left: 1rem;
  }

  #del-task,
  #edit-task {
    width: 10rem;
    height: 3rem;
    background-color: rgb(13, 6, 65);
    color: white;
    margin: 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.2rem;
  }
`;

export default DispTask;
