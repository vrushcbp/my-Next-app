import React from "react";

const Footer = () => {
  return (
    <footer className="h-40 bg-blue-600 mt-5">
      <div className="p-5 flex justify-around">
        <div className="flex flex-col justify-center text-center">
          <h1 className="text-3xl">Welcome to the work manager</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipiscing elit. Ad a velit
          </p>
        </div>
        <div className="text-center">
          <h1 className="">Important Links</h1>
          <ul className="">
            <li className="">
              <a href="">Facebook</a>
            </li>
            <li className="">
              <a href="">Instagram</a>
            </li>
            <li className="">
              <a href="">Youtube</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
