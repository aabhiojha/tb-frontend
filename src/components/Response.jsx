import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import ReactMarkdown from "react-markdown";
import { IoClose } from "react-icons/io5";
import Loading from "./Loading.jsx";
import MapComponent from "./Map/MapComponent.jsx";
import useChatStore from "../store/chatStore.js";

const Response = ({ isLoading }) => {
  const chatHistory = useChatStore((state) => state.chatHistory);

  const resultArr = useStore((state) => state.resultArr);
  const [showMap, setShowMap] = useState(false);

  // Auto-show map when resultArr updates but keep it toggleable
  useEffect(() => {
    if (Array.isArray(resultArr) && resultArr.length > 0) {
      setShowMap(true);
    }
  }, [resultArr]);

  return (
    <div className="relative">
      <div className="w-full flex-1 overflow-auto no-scrollbar max-h-[65vh] px-8 py-4 space-y-6 rounded-md">
        {chatHistory.map((prompt, idx) => (
          <div key={idx} className="flex flex-col items-start space-y-4">
            <div className="self-end w-auto max-w-72 px-6 py-2 bg-slate-300 rounded-2xl">
              {isLoading ? "..." : prompt.msg}
            </div>

            {!isLoading ? (
              <div className="flex items-start space-x-4 w-3/4">
                <ReactMarkdown className="prose prose-md">
                  {prompt.ai}
                </ReactMarkdown>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        ))}
      </div>

      {resultArr.length > 0 && (
        <button
          onClick={() => setShowMap(!showMap)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
      )}

      {showMap && resultArr.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 ">
          <div className="relative w-full max-w-3xl h-[60vh]  rounded-lg shadow-lg p-4">
            <button
              onClick={() => setShowMap(false)}
              className="absolute -top-6 -right-6 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              <IoClose className="text-2xl text-gray-600" />
            </button>

            <MapComponent routeData={resultArr[0]} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Response;
