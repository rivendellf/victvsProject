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
      const sortedData = filteredData.sort(
        (a, b) => new Date(a.Date) - new Date(b.Date)
      );
      setData(sortedData);
    });
  }, [startDate, endDate]);

  const formatDate = (dateString) => {
    const [date, time] = dateString.split(" ");
    const [day, month, year] = date.split("/");
    const [hours, minutes, seconds] = time.split(":");
    const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    const dateObj = new Date(isoString);
    return dateObj.toLocaleString();
  };

  return (
    <>
      <h1 id="mainTitle">Exam Information</h1>

      <section class="filterContainer">
        <label id="filterTitle">Start Date:</label>
        <DatePicker
          format="dd-MM-yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </section>

      <section class="filterContainer">
        <label id="filterTitle">End Date:</label>
        <DatePicker
          format="dd-MM-yyyy"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
        />
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
