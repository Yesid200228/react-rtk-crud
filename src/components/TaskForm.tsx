import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../feactures/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../app/store";
import '.././index.css'


import styled from "styled-components";



const Button = styled.button`
  background-color: ${(props) => props.theme.main};
  padding: 0.5em;
  margin: 0.5em;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;


export default function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state: RootState) => state.tasks);

  const handledChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (params.id) {
      dispatch(editTask({ ...task, id: params.id }));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuidv4(),
        })
      );
    }

    navigate("/");
  };
  useEffect(() => {
    if (params.id) {
      const task = tasks.find((t) => t.id === params.id);
      if (task) {
        setTask(task);
      }
    }
  }, []);


  return (
    <form onSubmit={handleSubmit}>
      <h2>{params.id ? "Edit Task" : "Create Task"}</h2>
      <input
      className="css-input"
        name="title"
        type="text"
        placeholder="Title"
        onChange={handledChange}
        value={task.title}
      />
      <input
      className="css-input"
        name="description"
        placeholder="Description"
        onChange={handledChange}
        value={task.description}
      ></input>
      <Button theme={{main: "DarkBlue"}}>Save</Button>
    </form>
  );
}
