// import React from "react";
// import './dataTableStyle.css'
// import SearchBox from "../searchbox/SearchBox";
// import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
// import PaginationRounded from "../pagination/Pagination";

// export default function DataTable() {
//   return (
//     <div className="w-full bg-white rounded-md shadow-gray-dark table-container mt-5">
//       <table class="table-auto w-full ">
//         <thead>
//           <tr>
//             <th className="py-5 text-center text-lg text-gray font-bold">نام</th>
//             <th className="py-5 text-center text-lg text-gray font-bold">تخصص</th>
//             <th className="py-5 text-center text-lg text-gray font-bold">سال</th>
//             <th className="py-5 text-center text-lg text-gray font-bold">حدف</th>
//             <th className="py-5 text-center text-lg text-gray font-bold">ویرایش</th>
//           </tr>
//         </thead>
//         <tbody className="text-center">
//         <tr className="py-5">
//             <td className="text-center py-3"><SearchBox className='cursor-pointer' /></td>
//             <td className="text-center py-3"><SearchBox className='cursor-pointer' /></td>
//             <td className="text-center py-3"><SearchBox className='cursor-pointer' /></td>
//           </tr>
//           <tr className="py-3">
//             <td className="text-center py-4">The Sliding Mr. Bones</td>
//             <td className="text-center py-4">Malcolm Lockyer</td>
//             <td className="text-center py-4">1961</td>
//             <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
//             <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
//           </tr>
//           <tr className="py-4">
//             <td className="text-center py-4">Witchy Woman</td>
//             <td className="text-center py-4">The Eagles</td>
//             <td className="text-center py-4">1972</td>
//             <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
//             <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
//           </tr>
//           <tr className="py-4">
//             <td className="text-center py-4">Shining Star</td>
//             <td className="text-center py-4">Earth, Wind, and Fire</td>
//             <td className="text-center py-4">1975</td>
//             <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
//             <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
//           </tr>
//           <tr className="py-4">
//             <td className="text-center py-4">Shining Star</td>
//             <td className="text-center py-4">Earth, Wind, and Fire</td>
//             <td className="text-center py-4">1975</td>
//             <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
//             <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
//           </tr>
//           <tr className="py-4">
//             <td className="text-center py-4">Shining Star</td>
//             <td className="text-center py-4">Earth, Wind, and Fire</td>
//             <td className="text-center py-4">1975</td>
//             <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
//             <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
//           </tr>
//         </tbody>
//       </table>
//       {/* <button onClick={handleGet}></button> */}
//       <PaginationRounded />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "./dataTableStyle.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Loading from "../loading/Loading";
import "./dataTableStyle.css";
import SearchBox from "../searchbox/SearchBox";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import PaginationRounded from "../pagination/Pagination";
import Button from "@mui/material/Button";

export default function DataTable({
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
  mainCurrentPage,
  mainItemsPerPage,
}) {
  const [info, setInfo] = useState(data && data);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(mainCurrentPage);
  const [itemsPerPage, setItemsPerPage] = useState(mainItemsPerPage);
  const [selectedTrId, setSelectedTrId] = useState(null);
  const [totalPages, setTotalPages] = useState(total);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setInfo(data);
    setFilteredData(data);
    setTotalPages(Math.ceil(total / itemsPerPage));
    onPageChange(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage, data]);
  useEffect(() => {
    setTotalPages(Math.ceil(total / itemsPerPage));
    onPageChange(currentPage, itemsPerPage);
  }, [total, itemsPerPage, currentPage, onPageChange]);
  // useEffect(() => {
  //   if (selected === false) {
  //     setIsActive(false);
  //     setCurrentPage(1);
  //     onPageChange(1, itemsPerPage);
  //   } else {
  //     setCurrentPage(1);
  //     onPageChange(1, itemsPerPage);
  //   }
  // }, [selected, itemsPerPage, onPageChange]);

  const handleRowClick = (selectedData) => {
    setSelectedTrId(selectedData[idName]);
  };

  const infoThead = columns
    .filter((column) => !column.hidden)
    .map((column) => (
      <th
        className="py-5 text-center text-lg text-gray font-bold"
        key={column.customKey}
        onClick={() => handleSort(column.customKey)}
      >
        {column.title}{" "}
        {column.customKey === sortedCol && (
          <span>
            {orderSort ? (
              <KeyboardArrowDownOutlinedIcon />
            ) : (
              <KeyboardArrowUpOutlinedIcon />
            )}
          </span>
        )}
      </th>
    ));

  const tdSearchBox = columns
    .filter((column) => !column.hidden)
    .map((column) => (
      <td key={column.customKey} className={column.customKey}>
        <SearchBox
          className="cursor-pointer"
          handleSearchInput={(e) => handleSearchBox(e, column.customKey)}
        />
      </td>
    ));

  const infoTbody =
    !info || info.length === 0 ? (
      <tr>
        <td colSpan={columns.length}>
          {info && info.length === 0
            ? "No content available"
            : "Loading data..."}
        </td>
      </tr>
    ) : (
      info.map((row, index) => (
        <tr
          key={index}
          id={row[idName]}
          onClick={() => handleRowClick(row)}
          className={selectedTrId === row[idName] ? "selected" : ""}
        >
          {columns
            .filter((column) => !column.hidden)
            .map((column) => (
              <td key={column.customKey} data-th={column.customKey}>
                {row[column.customKey]}
              </td>
            ))}
        </tr>
      ))
    );

  const tableContent =
    !info || info.length === 0 ? (
      <tr>
        <td colSpan={columns.length + 2}>
          {info && info.length === 0 ? "No content available" : <Loading />}
        </td>
      </tr>
    ) : (
      <table className="table-auto w-full">
        <thead>
          <tr>
            {infoThead}
            <th className="py-5 text-center text-lg text-gray font-bold">
              حذف
            </th>{" "}
            {/* Add a new header cell for actions */}
            <th className="py-5 text-center text-lg text-gray font-bold">
              ویرایش
            </th>{" "}
            {/* Add a new header cell for actions */}
          </tr>
        </thead>
        <tbody className="text-center">
          {info.map((row, index) => (
            <tr
              key={index}
              id={row[idName]}
              onClick={() => handleRowClick(row)}
              className={selectedTrId === row[idName] ? "selected" : ""}
            >
              {columns
                .filter((column) => !column.hidden)
                .map((column) => (
                  <td
                    className="text-center py-3"
                    key={column.customKey}
                    data-th={column.customKey}
                  >
                    {row[column.customKey]}
                  </td>
                ))}
              <td className="text-center py-4">
                <TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary mx-auto" />
              </td>
              <td className="text-center py-4">
                <PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary mx-auto" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  return (
    <div className="w-full bg-white rounded-md shadow-gray-dark table-container mt-5">
      <div className="p-3">
        <div className="custom-container">
          <div className="flex justify-between content-center">
            <SearchBox
              className=" cursor-text"
              handleSearchInput={(e) => handleSearchBox(e)}
            />
            <Button variant="outlined">افزودن</Button>
          </div>
          <div className="datatable-style">{tableContent}</div>
          <div className="py-2">
            {total ? (
              <PaginationRounded
                className="centered-style"
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            ) : (
              <p className="text-sky-800 font-black mx-auto">
                {info && info.length === 0 ? "" : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
