import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import NetworkService from "../services/axios-service";
import { HTTP_STATUSES } from "../shared/constants";
import { Link, useRouteMatch, BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = (props) => {
  const stopNotify = () => toast("Generator terminated");
  const [numneric_counter, setnumneric_counter] = useState("");
  const [alphanumneric_counter, setalphanumneric_counter] = useState("");
  const [float_counter, setfloat_counter] = useState("");
  const [isGenerateReport, setisGenerateReport] = useState(true);
  const [isStop, setStop] = useState(false);

  const Form = () => {
    const [form, setForm] = useState({
      numeric: false,
      alphanumeric: false,
      float: false,
      file_size: 0,
    });

    const handleChange = (e) => {
      let formdata = form;
      formdata = {
        ...formdata,
        [e.target.name]:
          (e.target.name === "file_size" && (e.target.value || 0)) ||
          e.target.checked,
      };
      setForm(formdata);
    };

    let interval;
    const submit = () => {
      toast.info("Generator Initiated");
      form.file_size = parseInt(form.file_size) || 0;
      NetworkService.onDel(`/Report/DeleteFile`)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
      NetworkService.onPost(`/Report`, form)
        .then((res) => {
          if (res.status === HTTP_STATUSES.OK) {
            setnumneric_counter(res.data.intCount);
            setalphanumneric_counter(res.data.alphanumericCount);
            setfloat_counter(res.data.floatCount);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      interval = setInterval(() => {
        setStop((isStop) => {
          if (isStop) {
            clearInterval(interval);
          } else {
            NetworkService.onPost(`/Report`, form)
              .then((res) => {
                if (res.status === HTTP_STATUSES.OK) {
                  setnumneric_counter(res.data.intCount);
                  setalphanumneric_counter(res.data.alphanumericCount);
                  setfloat_counter(res.data.floatCount);
                  if (res.data.stopForSize) {
                    clearInterval(interval);
                    setisGenerateReport(false);
                  }
                  console.log(res);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }, 3000);
    };
    const stop = () => {
      toast.error("Generator Terminated");
      NetworkService.onGet(`/Report`)
        .then((res) => {
          if (res.status === HTTP_STATUSES.OK) {
            setnumneric_counter(res.data.intCount);
            setalphanumneric_counter(res.data.alphanumericCount);
            setfloat_counter(res.data.floatCount);
            setStop(true);
            setisGenerateReport(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    return (
      <div className="container">
        <div className="firstRow">
          <div className="row mt-4 mb-4">
            <div className="col-1">
              <input
                type="checkbox"
                onChange={(e) => handleChange(e)}
                name="numeric"
                id="numeric"
              />
            </div>
            <div className="col-1 text-start">
              <label htmlFor="numeric">Numeric</label>
            </div>
            <div className="col-5">
              <label htmlFor="filesize">Size of the output file (KB)</label>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-1">
              <input
                type="checkbox"
                onChange={(e) => handleChange(e)}
                name="alphanumeric"
                id="alphanumeric"
              />
            </div>
            <div className="col-1 text-start">
              <label htmlFor="alphanumeric">AlphaNumeric</label>
            </div>
            <div className="col-5">
              <input
                type="number"
                onChange={(e) => handleChange(e)}
                name="file_size"
                id="file_size"
                className="textC"
              />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-1">
              <input
                type="checkbox"
                onChange={(e) => handleChange(e)}
                name="float"
                id="float"
              />
            </div>
            <div className="col-1 text-start">
              <label htmlFor="float">Float</label>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <Button
                variant="primary"
                className="me-2 buttonC"
                onClick={() => {
                  submit();
                  stopNotify();
                }}
                disabled={!form.numeric && !form.alphanumeric && !form.float}
              >
                start
              </Button>
              <Button variant="danger" className="me-2 buttonC" onClick={stop}>
                Stop
              </Button>
              <ToastContainer />
            </div>
          </div>
        </div>
        <div className="row mt-4 mb-4">
          <div className="col-2 text-start">
            <label htmlFor="numeric_counter">Counter 1 (Numeric)</label>
          </div>
          <div className="col-5">
            <input
              type="text"
              readOnly
              value={numneric_counter}
              className="textC"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-3 text-start">
            <label htmlFor="alphanumneric_counter">
              Counter 2 (AlphaNumeric)
            </label>
          </div>
          <div className="col-3">
            <input
              type="text"
              readOnly
              value={alphanumneric_counter}
              className="textC"
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-2 text-start">
            <label htmlFor="float_counter">Counter 3 (Float)</label>
          </div>
          <div className="col-5">
            <input
              type="text"
              readOnly
              value={float_counter}
              className="textC"
            />
          </div>
        </div>
        <div className="row ">
          <div className="col-6 text-center">
            <Button
              as={Link}
              to="/report"
              variant="success"
              size="md"
              className="me-2 px-5 buttonC"
              style={{ "pointer-events": (isGenerateReport && "none") || "" }}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Form />
    </>
  );
};
export default Dashboard;
