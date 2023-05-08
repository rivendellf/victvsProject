import { getData } from "../api";
import { getCandidateName, getLocationList, getDateList } from "../api";
import { useState, useEffect } from "react";

export const Data = () => {
  const [data, setData] = useState([]);

  const [candidateName, setCandidateName] = useState([]);
  const [selectedCandidateName, setSelectedCandidateName] = useState("");

  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const [date, setDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });

    getCandidateName().then((data) => {
      setCandidateName(data);
    });

    getLocationList().then((data) => {
      setLocation(data);
    });

    getDateList().then((data) => {
      setDate(data);
    });
  }, []);

  const handleSelectedCandidate = (event) => {
    setSelectedCandidateName(event.target.value);
  };

  const handleSelectedLocation = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSelectedDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredData = data.filter((eachExam) => {
    const candidateMatch =
      selectedCandidateName === "" ||
      eachExam.CandidateName === selectedCandidateName;
    const locationMatch =
      selectedLocation === "" || eachExam.LocationName === selectedLocation;
    const dateMatch = selectedDate === "" || eachExam.Date === selectedDate;
    return candidateMatch && locationMatch && dateMatch;
  });

  return (
    <>
      <h1 id="mainTitle">Exam Information</h1>

      <p>
        {" "}
        <select id="select" onChange={handleSelectedCandidate}>
          <option value="">All Candidates</option>
          {candidateName.map((eachCandidate) => {
            return (
              <option key={eachCandidate} value={eachCandidate}>
                {eachCandidate}
              </option>
            );
          })}
        </select>
      </p>

      <p>
        {" "}
        <select id="select" onChange={handleSelectedLocation}>
          <option value="">All Locations</option>
          {location.map((eachLocation) => {
            return (
              <option key={eachLocation} value={eachLocation}>
                {eachLocation}
              </option>
            );
          })}
        </select>
      </p>

      <p>
        {" "}
        <select id="select" onChange={handleSelectedDate}>
          <option value="">All Dates</option>
          {date.map((eachDate) => {
            return (
              <option key={eachDate} value={eachDate}>
                {eachDate}
              </option>
            );
          })}
        </select>
      </p>

      {filteredData.map((eachExam) => {
        return (
          <section id="examContainer" key={eachExam.id}>
            <p id="examTitle">{eachExam.Title}</p>
            <p id="examDescription">{eachExam.Description}</p>
            <p id="examLocation">{eachExam.LocationName}</p>
            <p id="examCandidate">{eachExam.CandidateName}</p>
            <p id="examDate">{eachExam.Date}</p>
          </section>
        );
      })}
    </>
  );
};
