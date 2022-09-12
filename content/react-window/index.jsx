import "./styles.css";
import styled from "styled-components";
import { useState } from "react";

const LIST_LENGTH = 60;
const FIXED_HEIGHT = 30;
const TOTAL_HEIGHT = LIST_LENGTH * FIXED_HEIGHT;
const WINDOW_HEIGHT = 300;
const VISIBLE_ROW_NUM = Math.ceil(WINDOW_HEIGHT / FIXED_HEIGHT);
const ADDITIONAL_ROW_NUM = 3;

function App() {
  const [currentWindow, setCurrentWindow] = useState([
    0,
    VISIBLE_ROW_NUM + ADDITIONAL_ROW_NUM,
  ]);

  const handleScroll = (e) => {
    requestAnimationFrame(() => {
      const currentScroll = e.target.scrollTop;
      setCurrentWindow(getVisibleIndexMap(currentScroll));
    });
  };

  const getVisibleIndexMap = (currentScroll) => {
    const offset = Math.floor(currentScroll / FIXED_HEIGHT);
    const firstIndex =
      offset - ADDITIONAL_ROW_NUM < 0 ? 0 : offset - ADDITIONAL_ROW_NUM;

    const mightLastIndex = firstIndex + VISIBLE_ROW_NUM + ADDITIONAL_ROW_NUM;
    const lastIndex =
      mightLastIndex <= LIST_LENGTH
        ? mightLastIndex
        : mightLastIndex - ADDITIONAL_ROW_NUM <= LIST_LENGTH
        ? mightLastIndex - ADDITIONAL_ROW_NUM
        : LIST_LENGTH;

    return [firstIndex, lastIndex];
  };

  const originList = [...Array(LIST_LENGTH)].map((el, index) => (
    <Row key={index} isEven={index % 2 === 0} top={index * FIXED_HEIGHT}>
      row {index + 1}
    </Row>
  ));

  const [firstIndex, lastIndex] = currentWindow;

  return (
    <List onScroll={handleScroll}>
      <VirtualList>{originList.slice(firstIndex, lastIndex + 1)}</VirtualList>
    </List>
  );
}

const List = styled.ul`
  height: ${WINDOW_HEIGHT}px;
  overflow: scroll;
  border: 3px solid #2ab1ac;
  box-shadow: 2px 2px 10px 2px lightgray;

  padding: 0;
`;

const VirtualList = styled.div`
  position: relative;
  height: ${TOTAL_HEIGHT}px;
`;

const Row = styled.li`
  position: absolute;

  width: 100%;
  height: ${FIXED_HEIGHT}px;
  top: ${({ top }) => top}px;
  left: 0;
  list-style: none;

  background-color: ${({ isEven }) => isEven && "lightgray"};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
