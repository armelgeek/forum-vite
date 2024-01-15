import React from "react";
import ViewTopics from "./components/viewtopic";
import QuickResponse from "./QuickResponse";

const Topic = () => {

    return (
        <>
            <div className="">
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item active'>
                        <a href="#">Forum</a>
                    </li>
                    <li className='breadcrumb-item'>
                        <a href="#">Fun</a>
                    </li>
                    <div className="breadcrumb-item">
                        <a href="#">Les interviews de wanes</a>
                    </div>
                </ol>
            </div>
            <div className="flex flex-row my-3 justify-between items-start">
                <div className=""></div>
                <div className="action">
                    <button className="btn btn-primary btn-lg">Ecrire une reponse</button>
                </div>
                <div className="flex flex-row gap-2">

                    <p className='text-xs  text-danger'>Pages: 1 2 3 … 131</p>
                </div>
            </div>
            <ViewTopics />
            <div className="flex flex-row my-3 justify-between items-start">
                <div className=""></div>
                <div className="action">
                    <button className="btn btn-primary btn-lg">Ecrire une reponse</button>
                </div>
                <div className="flex flex-row gap-2">

                    <p className='text-xs text-danger'>Pages: 1 2 3 … 131</p>
                </div>
            </div>
            <QuickResponse/>
        </>
    );
};
export default Topic;
