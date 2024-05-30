import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const DragDropContextProvider = ({ children }) => {
  return <>{children}</>;
};

export default DragDropContext(HTML5Backend)(DragDropContextProvider);