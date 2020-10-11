import React from "react";
import Layout from "./Layout";

const Home = () => {
  return (
      <div>
          <Layout 
          title="Home Page"
           description="eCommerce APP" 
           className="container">
               <h2>Hello from layout Home Page</h2> 
               {/*children : entre les tags , il s'appele children */}
           </Layout>
      </div>
  )
};
export default Home;
