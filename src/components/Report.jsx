import { React, useState, useEffect } from "react";
import { withRouter, useHistory, useRouteMatch } from "react-router-dom";
import NetworkService from "../services/axios-service";
import { HTTP_STATUSES } from "../shared/constants";
import "../assets/css/report.css";

const ReportList = ({ data }) => {
  console.log(data);
  const newlist = data?.data?.slice(0, 7).map((item, index) => {
    return (
      <>
        {item.split(",")[0] && (
          <li key={Math.random(index)}>{item.split(",")[0] + " - numneric"}</li>
        )}
        {item.split(",")[1] && (
          <li key={Math.random(index)}>
            {item.split(",")[1] + " - alphanumneric"}
          </li>
        )}
        {item.split(",")[2] && (
          <li key={Math.random(index)}>{item.split(",")[2] + " - float"}</li>
        )}
      </>
    );
  });
  return (
    <div className="container">
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>% Numeric</th>
            <th>% Alphanumeric</th>
            <th>% Float</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>% {data?.intpercentage}</td>
            <td>% {data?.alphanumericpercentage}</td>
            <td>% {data?.floatpercentage}</td>
          </tr>
        </tbody>
      </table>
      <ul className="d-flex flex-column todo-list">{newlist}</ul>
    </div>
  );
};

const Report = () => {
  let { path, url } = useRouteMatch();

  const history = useHistory();
  const [ReportData, setReportData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getReportData = () => {
    setIsLoading(true);
    console.log("generateReport");
    // let data = {"intpercentage": 33.33,
    // "floatCount": 33.33,
    // "alphanumericCount": 33.33,
    // "data": [
    //   "32560,DNAHEUY9E,0.05",
    //   "15276,2PWS84ZCV,0.36",
    //   "4536,YQJ09GRB0,0.81",
    //   "26990,O515P0NM0,0.97",
    //   "19870,UM25XPS05,0.36"]}
    // setReportData(data);
    NetworkService.onGet(`/Report/GenerateReport`)
      .then((res) => {
        res.status === HTTP_STATUSES.OK && setReportData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getReportData();
  }, []);
  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className=" d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card px-3">
              <div className="card-body">
                <h4 className="card-title">
                  Distribution of the data types in the file
                </h4>
                {isLoading && "Loading Data..."}
                <div className="list-wrapper">
                  <ReportList data={ReportData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
