import { useState } from "react";
import Dash from "../../assets/Dashboard.png"




const SideNavBar = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Dashboard", src:"https://www.bellflowsystems.co.uk/skins/default/en/images/level-sensor-filter-icon.gife"},
    { title: "Notice", src: "https://intensityangola.com/pro/wp-content/uploads/2023/02/intensity_landing_page_prod-13.png" },
    { title: "Assignment", src: "User", gap: true },
    { title: "Class Schedule ", src: "Calendar" },
    { title: "Student Analytics", src: "Search" },
    { title: "Search", src: "Chart" },
    { title: "Account ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (
    <div className="flex">
       
      <div
        className={` ${
          open ? "w-72" : "w-10 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="https://th.bing.com/th/id/OIP.HI95UPwovl4M4akBGBHUvAAAAA?rs=1&pid=ImgDetMain" alt="control"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png" alt="logo"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
               <img className="w-7 h-7" src={Menu.src}/>
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};
export default SideNavBar;