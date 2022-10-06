import React, { useEffect, useState } from "react";
import { GlobalContext } from "../globalContext";
import MkdSDK from "../utils/MkdSDK";
import { AuthContext } from "../authContext";
import errorImg from "./images.png";
const AdminDashboardPage = () => {
  const { dispatch } = React.useContext(GlobalContext);
  const { dispatch: secdispatch } = React.useContext(AuthContext);
  const [videoData, setVideoData] = useState(null);
  const [pageIndex, setpageIndex] = useState(1);

  useEffect(() => {
    dispatch({
      type: "SNACKBAR",
      payload: { message: "globalmessage" },
    });
    let sdk = new MkdSDK();
    sdk
      .callRestAPI(
        {
          payload: {},
          page: pageIndex,
          limit: 10,
        },
        "PAGINATE"
      )
      .then((response) => {
        console.log(response);
        setVideoData(response);
      });
  }, [pageIndex]);
  return (
    <>
      <button
        type="button"
        className="absolute top-1 right-11 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={() => {
          window.location.href = "/admin/login";
          dispatch({
            type: "SNACKBAR",
            payload: { message: "" },
          });

          secdispatch({ type: "LOGOUT" });
        }}
      >
        Log Out
      </button>
      {!videoData && <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">Dashboard</div>}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {videoData && (
        <div>
          {videoData.list.map((video) => {
            return (
              <div className="w-full flex flex-row  items-left text-gray-700" key={video.id}>
                {`${video.id} `}
                <img
                  onError={(e) => {
                    e.target.src = errorImg;
                  }}
                  width={"30px"}
                  height={"25px"}
                  src={video.photo}
                />
                {`${video.title}  ${video.username} ${video.like}`}
                <br />
              </div>
            );
          })}{" "}
          <br />
          <br />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              if (pageIndex > 1) {
                setpageIndex(pageIndex - 1);
              }
            }}
          >
            previous
          </button>{" "}
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              if (pageIndex < videoData.num_pages) {
                setpageIndex(pageIndex + 1);
              }
            }}
          >
            next
          </button>
        </div>
      )}
    </>
  );
};

export default AdminDashboardPage;
