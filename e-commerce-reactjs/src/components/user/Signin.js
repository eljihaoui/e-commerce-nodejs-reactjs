import React from "react";
import Layout from "../../core/Layout";

const Signin = () => {
  return (
    <div>
     <Layout
        title="Signin page"
        description="Se connecter à notre application "
        className="container"
      >
        <h2>Hello from layout Home signin</h2>
        {/*children : entre les tags , il s'appele children */}
      </Layout>{" "}
    </div>
  );
};

export default Signin;
