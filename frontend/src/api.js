import axios from "axios";

const examInfoAPI = axios.create({
  baseURL: "http://localhost:9000/api/",
});

export const getTitles = () => {
  return examInfoAPI.get("/getTitles").then((res) => {
    return res.data;
  });
};

export const getCandidateName = () => {
  return examInfoAPI.get("/getCandidateName").then((res) => {
    return res.data;
  });
};

export const getLocationList = () => {
  return examInfoAPI.get("/getLocationList").then((res) => {
    return res.data;
  });
};

export const getDateList = () => {
  return examInfoAPI.get("/getDateList").then((res) => {
    return res.data;
  });
};

export const getData = (startDate, endDate) => {
  const params = {};

  if (startDate && endDate) {
    params.startDate = startDate;
    params.endDate = endDate;
  }
  return examInfoAPI.get("/getData", { params }).then((res) => {
    return res.data;
  });
};
