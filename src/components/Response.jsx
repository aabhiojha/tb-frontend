import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import ReactMarkdown from "react-markdown";
import { IoClose } from "react-icons/io5";
import Loading from "./Loading.jsx";
import MapComponent from "./Map/MapComponent.jsx";
import useChatStore from "../store/chatStore.js";
import { FcLineChart } from "react-icons/fc";

const Response = ({ isLoading }) => {
  const chatHistory = useChatStore((state) => state.chatHistory);
  const resultArr = useStore((state) => state.resultArr);
  const showMap = useStore((state) => state.showMap);
  const setShowMap = useStore((state) => state.setShowMap);
  // Auto-show map when resultArr updates but keep it toggleable
  useEffect(() => {
    if (Array.isArray(resultArr) && resultArr.length > 0) {
      setShowMap(true);
    }
  }, [resultArr]);

  return (
    <div className="relative h-full">
      {/* Two-column layout when resultArr is populated and showMap is true */}
      {resultArr.length > 0 && showMap ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Left side: Chat History */}
          <div className="overflow-auto no-scrollbar max-h-[75vh] px-8 py-10 space-y-6 rounded-md ">
            {chatHistory.map((prompt, idx) => (
              <div key={idx} className="flex flex-col items-start space-y-4">
                <div className="self-end w-auto max-w-72 px-6 py-2 bg-slate-300 rounded-2xl">
                  {isLoading ? "..." : prompt.msg}
                </div>

                {!isLoading ? (
                  <div className="flex items-start space-x-4 w-3/4">
                    {/* Check if the response is a location array */}
                    {Array.isArray(resultArr) && resultArr.length > 0 ? (
                      <div className="space-y-4">
                        {resultArr[0].map((place, i) => (
                          <div
                            key={i}
                            className="p-4 bg-white rounded-lg shadow-md"
                          >
                            <h3 className="font-extrabold">{`Day: ${
                              i + 1
                            }`}</h3>
                            <h4 className="font-semibold text-lg">
                              {place.location}
                            </h4>
                            <p className="text-gray-700">{place.highlight}</p>
                            <p>
                              <strong>Best time to visit:</strong>{" "}
                              {place.description.best_time_to_visit}
                            </p>
                            <p>
                              <strong>Key Highlights:</strong>{" "}
                              {place.description.key_highlights.join(", ")}
                            </p>
                            <p>
                              <strong>Trekking Duration:</strong>{" "}
                              {place.description.trekking_duration}
                            </p>
                            <p>
                              <strong>Tips:</strong>{" "}
                              {place.description.tips.join(", ")}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ReactMarkdown className="prose prose-md">
                        {prompt?.ai}
                      </ReactMarkdown>
                    )}
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            ))}
          </div>

          {/* Right side: Map */}
          <div className="sticky top-0 h-[75vh] rounded-lg shadow-lg p-4">
            <MapComponent routeData={resultArr[0]} />
          </div>
        </div>
      ) : (
        // Single-column layout when resultArr is empty or showMap is false
        <div className="w-full flex-1 overflow-auto no-scrollbar max-h-[65vh] px-8 py-4 space-y-6 rounded-md">
          {chatHistory.map((prompt, idx) => (
            <div key={idx} className="flex flex-col items-start space-y-4">
              <div className="self-end w-auto max-w-72 px-6 py-2 bg-slate-300 rounded-2xl">
                {isLoading ? "..." : prompt.msg}
              </div>

              {!isLoading ? (
                <div className="flex items-start space-x-4 w-3/4">
                  <ReactMarkdown className="prose prose-md">
                    {prompt?.ai
                      .replace("<tool-use>", "")
                      .replace(/\{.*\}/, "")
                      .replace("</tool-use>", "") || "Something went wrong"}
                  </ReactMarkdown>
                </div>
              ) : (
                <Loading />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toggle Button */}
      {resultArr.length > 0 && (
        <button
          onClick={() => setShowMap(!showMap)}
          className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200"
        >
          {showMap ? "Hide Map" : "Show Map"}
        </button>
      )}
    </div>
  );
};

export default Response;
