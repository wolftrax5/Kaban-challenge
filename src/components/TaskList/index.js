import React from "react";

export const TaskList = ({ children , name, index}) => {
  return (
    <div className="card outlined ml-20 mt-0">
      <div className="card-text">
        <h4>{name}</h4>
        <ul className="styled mt-50" data-testid={`stage-${index}`}>
          {children}
        </ul>
      </div>
    </div>
  );
};
