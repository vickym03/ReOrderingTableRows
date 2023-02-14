import React from "react";
import styled from "styled-components";

const HandleWrapper = styled.div`
  height: 1rem;
  vertical-align: bottom;
   display: inline-block;
  margin-right: 0.5rem;
  svg {
    width: 100%;
    height: 100%;
  }
   cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
`;

export const DragHandle = (props) => {
  return (
    <HandleWrapper {...props}>
     
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-up" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"/>
</svg>
    </HandleWrapper>
  );
};
