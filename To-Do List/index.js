document.getElementById("add-btn").addEventListener("click", () => {
  AddTask();
});

document.getElementById("clr-list").addEventListener("click", () => {
  if (window.confirm("Are you sure want to delete all task list?")) {
    localStorage.clear();
    RefreshList(false);
  }
});

const container = document.getElementById("task-list");

const tasksList = { ...localStorage };

if (Object.keys(tasksList).length != 0) {
  container.innerHTML = null;
  RefreshList();
} else {
  RefreshList(false);
}

//sorting task

const sel = document.getElementById("sort-opt");
sel.onchange = () => {
  if (sel.value == "all") {
    RefreshList(false, "none");
    RefreshList(true, sel.value);
  } else {
    RefreshList(false, sel.value);
    RefreshList(true, sel.value);
  }
};

function AddTask() {
  container.innerHTML = null;

  const task_val = document.getElementById("text-in").value;

  const completed_task = false;
  const date = new Date();
  let hrs = date.getHours(),
    mins = date.getMinutes(),
    sec = date.getSeconds();

  mins < 10 ? (mins = ":0" + mins) : (mins = ":" + mins);
  sec < 10 ? (sec = ":0" + sec) : (sec = ":" + sec);

  const task_id = date.toLocaleDateString() + " -- " + hrs + mins + sec;
  const Task = {
    content: task_val,
    completed: completed_task,
    addedTime: task_id,
  };

  localStorage.setItem(task_id, JSON.stringify(Task));

  RefreshList();

  document.getElementById("text-in").value = "";
}

function RefreshList(opt = true, sort = "all") {
  if (!opt) {
    container.innerHTML = null;

    let msg = document.createElement("div");
    if (sort == "false") {
      msg.innerText = "Pending Tasks...";
    } else if (sort == "true") {
      msg.innerText = "Completed Tasks";
    } else if (sort == "none") {
      msg.innerText = "";
    } else {
      msg.innerText = "No Task Exits...";
    }
    msg.style.fontSize = "1.5rem";
    msg.style.textAlign = "center";
    container.appendChild(msg);

    return 0;
  }

  const items = { ...localStorage };
  const result = Object.keys(items).map((key) => [key, items[key]]);

  if (sort == "true") {
    result.map((task) => {
      if (JSON.parse(task[1]).completed) {
        CreateList(task);
      }
    });
  } else if (sort == "false") {
    result.map((task) => {
      if (!JSON.parse(task[1]).completed) {
        CreateList(task);
      }
    });
  } else {
    result.map((task) => {
      CreateList(task);
    });
  }
}

function CreateList(task) {
  let tsk = document.createElement("div");
  tsk.className = "tasks";

  let checkboxel = document.createElement("input");
  checkboxel.type = "checkbox";
  checkboxel.className = "tick";
  checkboxel.checked = JSON.parse(task[1]).completed;
  checkboxel.onchange = () => {
    const Task = {
      content: JSON.parse(task[1]).content,
      completed: !JSON.parse(task[1]).completed,
      addedTime: JSON.parse(task[1]).addedTime,
    };
    localStorage.setItem(task[0], JSON.stringify(Task));
  };

  let contents = document.createElement("div");
  contents.innerText = `${JSON.parse(task[1]).content}`;
  contents.className = "task-name";

  let timec = document.createElement("div");
  timec.innerText = `${JSON.parse(task[1]).addedTime}`;
  timec.className = "task-addedAt";

  let temp = document.createElement("div");
  temp.append(timec, tsk);
  temp.className = "task-content";
  temp.id = task[0] + "task";

  let delBtn = document.createElement("button");
  delBtn.className = "del-btn";
  delBtn.textContent = "Delete Task";
  delBtn.onclick = () => {
    localStorage.removeItem(task[0]);
    var elem = document.getElementById(task[0] + "task");
    elem.parentNode.removeChild(elem);
  };

  let editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit Task";
  editBtn.onclick = () => {
    document.getElementById("text-in").value = JSON.parse(task[1]).content;
    document.getElementById("text-in").focus();
    localStorage.removeItem(task[0]);
    var elem = document.getElementById(task[0] + "task");
    elem.parentNode.removeChild(elem);
  };

  tsk.append(checkboxel, contents, delBtn, editBtn);
  container.append(temp);
}
