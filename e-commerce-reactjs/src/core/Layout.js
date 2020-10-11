import React from "react";

const Layout = (props) => {
  const {  description, children, className } = props;
  return (
    <div>
      <div className="jumbotron p-2">
        {/* <p className="lead" ><span class="material-icons" style={{ position: 'relative', top: 5 }}>keyboard_arrow_right</span>  {title}</p> */}
        <p className="lead"><span className="material-icons" style={{ position: 'relative', top: 5 }}>  keyboard_arrow_right</span> {description} </p>
      </div>
      <div className={className}>
        {children}
        </div>
    </div>
  );
};

export default Layout;
