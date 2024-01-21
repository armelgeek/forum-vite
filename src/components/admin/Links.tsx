import React, { memo } from "react";
import { FaPlusCircle } from "react-icons/fa";
const Links = memo(
  ({ title, description = '', children }: any) => {
    return (
      <div className="flex flex-col  justify-between gap-y-1  pb-1 pt-1 sm:flex-row sm:gap-y-0">
        <div className="flex flex-row  items-center">
          <div className="title-links">
            <div className="flex flex-row gap-2 items-center">
              <h5 className="text-md font-bold uppercase text-danger-500">{title}</h5>
             
            </div>
            {description && (<p className="text-sm italic">{description}</p>)}
          </div>


        </div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Koragna</a>
          </li>
          {children}
        </ol>
      </div>
    );
  },
  (prev, next) => {
    return prev.title == next.title && prev.children == next.children;
  }
);
export default Links;
