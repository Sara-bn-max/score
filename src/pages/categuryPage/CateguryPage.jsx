import { useEffect, useState, useLayoutEffect } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "@mui/material/Button";
import DataTable from "../../components/dataTable/DataTable";
import { get } from "../../servises/http";
import { ToastContainer, toast } from "react-toastify";

export default function CateguryPage() {
  const [infos, setinfos] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [addedData, setAddedData] = useState(null);
  const [preEditData, setPreEditData] = useState(null);
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [selected, setSelected] = useState(null);
  const [token, setToken] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [token]);

  //////GET ALL DATA API/////
  const [order, setOrder] = useState(true);
  const [sortedCol, setSortedCol] = useState(null);
  const [className, setClassName] = useState(null);
  const [searchText, setSearchText] = useState(null);

  useEffect(() => {
    fetchData();
  }, [token, pageSize, pageIndex, sortedCol, order]);

  const fetchData = () => {
    if (token) {
      let apiUrl = `/api/Administration/TrainingClassCategory/Get?PageSize=${pageSize}&PageIndex=${pageIndex}`;

      if (sortedCol) {
        apiUrl += `&reverse=${order}`;
      }

      if (searchText) {
        const searchColumn = className ? `&SearchColumn=${className}` : "";
        apiUrl += `&title=${searchText}`;
      }

      get(apiUrl, token)
        .then((response) => {
          setinfos(response.records);
          setTotalCount(response.details.totalRecordCount);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handlePageChange = (newPage, newSize) => {
    setCurrentPage(newPage);
    setPageSize(newSize);
  };

  const handleSearchBox = (data, className) => {
    const query = data.target.value;
    setSearchText(query);
    setClassName(className);
  };

  const handleSort = (data) => {
    if (data === sortedCol) {
      setOrder(!order);
    } else {
      setOrder(true);
      setSortedCol(data);
    }
  };

  useEffect(() => {
    setPageIndex(currentPage);
    setSelected(false);
  }, [currentPage]);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      fetchData();
    }, 700);

    return () => clearTimeout(typingTimeout);
  }, [searchText, className]);
  ///////COLUMNS//////////

  let columns = [
    {
      customKey: "title",
      title: "عنوان",
    },
    {
      customKey: "updateSubDate",
      title: "تاریخ ایجاد",
    },
  ];

  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <div>
          <PageTitle>دسته بندی</PageTitle>
          <BreadCrumb>
            <p>پنل مدیران</p>
            <p>دسته بندی ها</p>
          </BreadCrumb>
        </div>
      </div>
      <div className="w-full content">
        <DataTable
          data={infos}
          columns={columns}
          total={totalCount}
          idName="id"
          onPageChange={handlePageChange}
          handleSearchBox={handleSearchBox}
          handleSort={handleSort}
          orderSort={order}
          sortedCol={sortedCol}
          mainCurrentPage={currentPage}
          mainItemsPerPage={pageSize}
        />
      </div>
    </div>
  );
}
