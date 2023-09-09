import { useState, useEffect, useLayoutEffect } from "react";
import "./dataTableStyle.css";
import CustomPagination from "../Pagination/CustomPagination";
import SearchBox from "../searchbox/SearchBox";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import CustomSelect from "../customSelect/CustomSelect";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

export default function DataTable2({
  data,
  columns,
  total,
  selected,
  idName,
  onPageChange,
  handleSearchBox,
  handleSort,
  orderSort,
  sortedCol,
  tableName,
  mainCurrentPage,
  mainItemsPerPage
}) {
  const [info, setInfo] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(mainCurrentPage);
  const [itemsPerPage, setItemsPerPage] = useState(mainItemsPerPage);
  const [totalPages, setTotalPages] = useState(total);
  const [selectedTrId, setSelectedTrId] = useState(null);
  const [isActive, setIsActive] = useState(false);


  useEffect(() => {
    setInfo(data);
    setFilteredData(data);
    setTotalPages(Math.ceil(total / itemsPerPage));
    onPageChange(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, data]);


  useEffect(() => {
    if (selected != null) {
      if (selected == false) {
        setIsActive(false);
        setCurrentPage(1);
        onPageChange(currentPage, itemsPerPage);
      } else {
        setCurrentPage(1);
        onPageChange(currentPage, itemsPerPage);
      }
    }
  }, [selected]);

  const infoThead = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => {
      if (column.hidden) {
        return null;
      } else {
        const order = orderSort;
        const sortedColClicked = sortedCol;
        const isSorted = column.customKey == sortedColClicked;
        const icon = isSorted ? (
          order ? (
            <KeyboardArrowDownOutlinedIcon />
          ) : (
            <KeyboardArrowUpOutlinedIcon />
          )
        ) : null;
        return (
          <th
            key={column.customKey}
            onClick={() => handleSort(column.customKey)}
          >
            {column.title}
            {icon}
          </th>
        );
      }
    })
  );

  const tdSearchBox = !info ? (
    <Loading />
  ) : (
    columns.map((column, index) => {
      if (column.hidden) {
        return null;
      } else {
        return (
          <td key={column.customKey} className={column.customKey}>
            <SearchBox
              handleSearchInput={(e) => handleSearchBox(e, column.customKey)}
            />
          </td>
        );
      }
    })
  );

  const handleRowClick = (selectedData) => {
    setSelectedTrId(selectedData[`${idName}`]);
  };

  const infoTbody = !info ? (
    <Loading />
  ) : info.length === 0 ? (
    <p className="text-sky-800 font-black mx-auto my-5">
      {t("actionMessages.noContent")}
    </p>
  ) : (
    info.map((row, index) => (
      <tr
        key={index}
        id={`${row[`${idName}`]}`}
        onClick={() => handleRowClick(row)}
        className={selectedTrId === row[`${idName}`] ? "selected" : ""}
      >
        {columns.map((column, index) => {
          if (column.hidden) {
            return null;
          } else {
            return (
              <td key={index} data-th={column.customKey}>
                {row[column.customKey]}
              </td>
            );
          }
        })}
      </tr>
    ))
  );

  return (
    <>
      <div className="child-table">
        <div className="flex justify-between p-3 titleBarChild">
          <span class="inline-flex font-bold text-xl items-center px-3 bg-darak-blue ring-1 ring-inset ring-blue-700/10">
            {tableName}
          </span>
        </div>
        <div className="p-3">
        <div
          className="TopBar flex flex-row flex-wrap justify-between mt-2"
          handleSearch={(e) => handleSearchBox(e)}
        >
          <div className="">
            <SearchBox handleSearchInput={(e) => handleSearchBox(e)} />
          </div>
        </div>

        <div className="custom-container">
          {!filteredData ? (
            <Loading />
          ) : (
            <>
              <div className="datatable-style">
                <table class="rwd-table">
                  <tbody>
                    <tr>{infoThead}</tr>
                    <tr className="search-row">{tdSearchBox}</tr>
                    {infoTbody}
                  </tbody>
                </table>
              </div>

              <div className="py-2">
                {total ? (
                  <CustomPagination
                    className="centered-style "
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onChange={setCurrentPage}
                  />
                ) : info.length === 0 ? (
                  <p className="text-sky-800 font-black mx-auto">
                    {t("actionMessages.noContent")}
                  </p>
                ) : (
                  <Loading />
                )}
              </div>
            </>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
