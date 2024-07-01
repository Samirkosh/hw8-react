import React, { useRef, useState } from "react";
import { Button } from "../modal/Button";
import { Modal } from "../modal/Modal";
import styled from "styled-components";

export const TodoForm = () => {
  const inputRef = useRef();
  const [todo, setTodo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      alert("Enter please!");
      return;
    }

    if (updateId) {
      setTodo(
        todo.map((todos) =>
          todos.id === updateId
            ? { ...todos, title: inputRef.current.value }
            : todos
        )
      );
      setUpdateId(null);
    } else {
      const newValue = {
        title: inputRef.current.value,
        id: Date.now(),
      };
      setTodo([...todo, newValue]);
    }

    inputRef.current.value = "";
  };

  const updateHandler = (item) => {
    inputRef.current.value = item.title;
    setUpdateId(item.id);
  };

  const openAndCloseModal = (item) => {
    setCurrentItem(item);
    setShowModal(!showModal);
  };

  const handleDeleteClick = (id) => {
    const removeItem = todo.filter((todos) => {
      return todos.id !== id;
    });
    setTodo(removeItem);
    setShowModal(false);
  };

  return (
    <StyledDiv>
      <StyledForm onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter..." ref={inputRef} />
        <Button>Add</Button>
      </StyledForm>
      <StyledUl>
        {todo.map((item) => (
          <StyledLi key={item.id}>
            <p>{item.title}</p>
            <StyledSection>
              <Button onClick={() => openAndCloseModal(item)}>delete</Button>
              <Button onClick={() => updateHandler(item)}>update</Button>
            </StyledSection>
            {showModal && currentItem && currentItem.id === item.id && (
              <Modal onClose={openAndCloseModal}>
                <h2>Вы точно хотите удалить?</h2>
                <StyledArticle>
                  <Button onClick={() => handleDeleteClick(item.id)}>Да</Button>
                  <Button onClick={openAndCloseModal}>Нет</Button>
                </StyledArticle>
              </Modal>
            )}
          </StyledLi>
        ))}
      </StyledUl>
    </StyledDiv>
  );
};

const StyledForm = styled.form`
  display: flex;
  gap: 20px;
  padding-top: 30px;

  input,
  button {
    width: 500px;
    height: 50px;
    border: 2px solid green;
    padding-left: 20px;
    font-size: 20px;
    color: green;
    border-radius: 5px;
  }

  button {
    width: 120px;
    height: 50px;
    padding: 0;
    background-color: #b0e6b0;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledLi = styled.li`
  width: 640px;
  height: 50px;
  background-color: #dbf7db;
  border: 2px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 20px;
  border-radius: 5px;
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: green;
  font-size: 20px;
  list-style-type: circle;

  button {
    width: 100px;
    height: 40px;
    background-color: #b0e6b0;
    border: 2px solid green;
    font-size: 20px;
    border-radius: 8px;
    color: green;
  }
`;

const StyledSection = styled.section`
  display: flex;
  gap: 20px;
`;

const StyledArticle = styled.article`
  display: flex;
  gap: 50px;
`;
