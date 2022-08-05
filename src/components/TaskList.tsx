import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { deleteTask } from "../feactures/tasks/taskSlice";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

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

const ButtonCreate = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.main};
`;
const theme = {
  main: "mediumseagreen",
};

export const CardWrapper = styled.div`
  background-color: ${(props) => props.theme.main};
  overflow: hidden;
  padding: 0 0 32px;
  margin: 15px ;
  width: 300px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

export const CardOptions = styled.ul`
  padding: 0;
  margin: 16px 0 8px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  list-style-type: none;
`;

export const CardOptionsItem = styled.li`
  &:nth-of-type(n + 2) {
    margin-left: 16px;
  }
`;

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <header>
        <h1>Tasks {tasks.length}</h1>
        <Link to={"/create-task"}>
          <ButtonCreate theme={{ main: "darkorange" }}>
            Create Task
          </ButtonCreate>
        </Link>
      </header>

      <CardOptions>
        {tasks.map((task) => (
          <div key={task.id}>
            <CardWrapper  theme={{ main: "Gray" }} >
              <span>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <Button
                  theme={{ main: "darkred" }}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
                <Button theme={{main: "DarkBlue"}}>
                  <Link to={`/edit-task/${task.id}`}>Edit</Link>
                </Button>
              </span>
            </CardWrapper>
          </div>
        ))}
      </CardOptions>
    </div>
  );
}
