import useStore from "../store/store.js";
import ReactMarkdown from "react-markdown";
import { FcDebian } from "react-icons/fc";
import Loading from "./Loading.jsx";
import { useState } from "react";
import MapComponent from "./Map/MapComponent.jsx";

const Response = () => {
  const recentPrompt = useStore((state) => state.recentPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const result = useStore((state) => state.result);
     const resultArr = useStore(state=>state.resultArr)
  
  return (
    <div>
       <div className="w-full flex-1 overflow-auto no-scrollbar max-h-[65vh] px-8 py-4 space-y-6 rounded-md">
      {recentPrompt.map((prompt, idx) => (
        <div key={idx} className="flex flex-col items-start space-y-4">
          <div className="self-end w-auto px-6 py-2 bg-slate-300 rounded-2xl">
            {isLoading ? "..." : prompt}
          </div>

          {!isLoading ? (
            <div className="flex items-start space-x-4 w-3/4 ">
              <div>
                <FcDebian className="text-4xl" />
              </div>

              <ReactMarkdown className="prose prose-md">
                {result[idx]}
              </ReactMarkdown>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      ))}
    </div>

    {resultArr.length > 0 ? <MapComponent routeData={resultArr[0]} />: null}
    </div>
   
  );
};

export default Response;
