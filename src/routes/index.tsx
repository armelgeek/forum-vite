import "../App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "../Home";
import RedirectRoute from "../routes/RedirectRoute";
import PrivateRoute from "../routes/PrivateRoute";
import Forum from "../Forum";
import Header from "../components/Header";
import { BsChat } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import Topic from "../Topic";
import CreateTopic from "../CreateTopic";
import NewResponse from "../NewResponse";
const Index = () => {

  return (
    <div>

      <Router>
        <Header />
        <div className="mx-40 mt-8">
          <div className="gap-5 dark:bg-slate-800 grid grid-cols-9 max-[828px]:mx-20 max-[711px]:mx-10 max-[675px]:mx-20 max-[591px]:mx-16 max-[528px]:mx-4 max-[474px]:h-24 max-[474px]:pb-10">
            <div className="col-span-6">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/forum" exact component={Forum} />
                <Route path="/viewtopic" exact component={Topic} />
                <Route path="/new/topic" exact component={CreateTopic} />
                <Route path="/new/response" exact component={NewResponse} />
              </Switch>
            </div>
            <div className="col-span-3">
              <div className=" sticky top-16">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title flex flex-row gap-2 items-center  text-primary-500"><IoChatbubbles size={28} /><span className="font-medium">Dernières réactions du forum</span></h4>
                  </div>
                  <div className="card-body">
                    <div className="card-content flex flex-col ">
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-success-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-zinc-400"></div>
                        <div className="time">
                          <a href="#" className="text-xs text-gray-400">09h47</a>
                        </div>
                        <div className="tag">
                          <p className="text-xs text-gray-500">Ma petite présentation</p>
                        </div>
                        <div className="icon">
                          <div className="text-xs flex flex-row gap-1 items-center text-gray-400">{'('}100<BsChat className="text-xs text-gray-400" />{')'}</div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                {/**<div className="card mt-7">
                  <div className="card-header">
                    <h4 className="card-title flex flex-row gap-2 items-center  text-primary-500"><FaUserFriends size={28} /><span className="font-medium">Top 10 des auteurs</span></h4>
                  </div>
                  <div className="card-body">

                  </div>
                </div>**/}
              </div>
            </div>
          </div>
        </div>
      </Router>

    </div>
  );
};

export default Index;
