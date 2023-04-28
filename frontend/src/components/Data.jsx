import { getData } from "../api";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Data = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleFilter = () => {
    getData(startDate, endDate).then((data) => {
      setData(data);
    });
  };

  useEffect(() => {
    getData().then((data) => {
      let filteredData = data;
      if (startDate && endDate) {
        filteredData = data.filter((item) => {
          const itemDate = new Date(item.Date);
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
      setData(filteredData);
    });
  }, [startDate, endDate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <h1 id="mainTitle">Exam Information</h1>

      <section class="filterContainer">
        <label id="filterTitle">Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </section>

      <section class="filterContainer">
        <label id="filterTitle">End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </section>

      <button class="filterButton" onClick={handleFilter}>
        Filter
      </button>

      {data.map((eachExam) => {
        return (
          <section id="examContainer" key={eachExam.id}>
            <p id="examTitle">{eachExam.Title}</p>
            <p id="examDescription">{eachExam.Description}</p>
            <p id="examLocation">{eachExam.LocationName}</p>

            <p id="examDate">{formatDate(eachExam.Date)}</p>
          </section>
        );
      })}
    </>
  );
};
