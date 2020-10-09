import React from "react";

const Layout = (props) => {
  const { title, description, children, className } = props;
  return (
    <div>
      <div className="jumbotron p-3">
        <h1 className="display-4">{title}</h1>
        <p className="lead"> {description} </p>
      </div>
      <div className={className}>{children}</div>
    </div>
  );
};

export default Layout;
