import { useEffect, useState, useLayoutEffect } from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from "@mui/material/Button";
import DataTable from "../../components/dataTable/DataTable";
import { del, get, post, put } from "../../servises/http";
import { ToastContainer, toast } from "react-toastify";
import CustomModal from "../../components/customModal/CustomModal";
import InputField from "../../components/inputField/InputField";
import TextareaField from "../../components/textareaField/TextareaFiels";
import ButtonFieldError from "../../components/buttonField/ButtonFieldError";
import ButtonFieldSuccess from "../../components/buttonField/ButtonFieldSuccess";

export default function StatePage() {
  const [infos, setinfos] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [token, setToken] = useState(null);
  const [pageSize, setPageSize] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(1);
  const [added, setAdded] = useState(null);
  const [edited, setEdited] = useState(null);
  const [deleted, setDeleted] = useState(null);

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
  }, [token, pageSize, pageIndex, sortedCol, order, added, edited, deleted]);

  const fetchData = () => {
    if (token) {
      let apiUrl = `api/State/Get?PageSize=${pageSize}&PageIndex=${pageIndex}`;

      if (sortedCol) {
        apiUrl += `&reverse=${order}`;
      }

      if (searchText) {
        const searchColumn = className ? `&SearchColumn=${className}` : "";
        apiUrl += `&stateTitle=${searchText}`;
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
      customKey: "stateTitle",
      title: "عنوان استان",
    },
    {
      customKey: "stateCountryTitle",
      title: "کشور",
    },
    {
      customKey: "stateTelephoneCode",
      title: "پیش شماره",
    },
    {
      customKey: "updateSubdate",
      title: "تاریخ به روز رسانی",
    },
  ];
  ///add
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    stateTitle: "",
    stateTelephoneCode: "",
    stateCountryId: "",
    id: "",
  });
  const [errors, setErrors] = useState({});
  const handleAdd = () => {
    setShowAdd(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitAdd = (e) => {
    e.preventDefault();

    // Basic validation
    const validationErrors = {};

    // if (!formData.name.trim()) {
    //   validationErrors.name = "Name is required";
    // }
    // Check if there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // If there are no errors, submit the form
      post(`/api/State/Create`, formData, token)
        .then((response) => {
          toast.success(response.description);
          setAdded(response.isSucceeded);
          setFormData({
            stateTitle: "",
            stateTelephoneCode: "",
            stateCountryId: 1,
          });
        })
        .catch((error) => {
          toast.error("عملیات با خطا مواجه شد");
          setFormData({
            stateTitle: "",
            stateTelephoneCode: "",
            stateCountryId: 1,
          });
        });
      setShowAdd(false);
    }
  };
  const modalBodyAdd = (
    <div>
      <form onSubmit={submitAdd}>
        <PageTitle>افزودن استان</PageTitle>
        <div className="mb-3 md:grid md:grid-cols-2  md:gap-3">
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="stateTitle"
            required="true"
            value={formData.stateTitle}
            placeholder="تهران"
            onChange={handleChange}
            labelTxt="نام استان"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="stateTelephoneCode"
            required="true"
            value={formData.stateTelephoneCode}
            placeholder="021"
            onChange={handleChange}
            labelTxt="پیش شماره"
          />
        </div>
        <div className="flex flex-row">
          <ButtonFieldSuccess
            className="basis-1/2 mx-1"
            btnTxt="ثبت"
            btnType="submit"
          />
          <ButtonFieldError
            className="basis-1/2 mx-1"
            btnTxt="انصراف"
            btnOnClick={() => {
              setShowAdd(false);
              setFormData({
                stateTitle: "",
                stateTelephoneCode: "",
                stateCountryId: 1,
              });
            }}
            btnType="button"
          />
        </div>
      </form>
    </div>
  );

  //edit
  const [showEdit, setShowEdit] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const handleEdit = (data) => {
    get(
      `/api/State/GetDetails/${data.id}`,
      token
    ).then((response) => {
      setFormData({
        stateTitle: response.stateTitle,
        stateTelephoneCode: response.stateTelephoneCode,
        stateCountryId: 1,
        id: data.id
      });
      setShowEdit(true);
      setEditedId(data.id);
    });
  };
  const submitEdit = (e) => {
    e.preventDefault();
    put(
      `/api/State/Edit`,
      formData,
      token
    )
      .then((response) => {
        toast.success(response.description);
        setEdited(response.isSucceeded);
        setFormData({
            stateTitle: "",
            stateTelephoneCode: "",
            stateCountryId: 1,
            id: "",
        });
      })
      .catch((error) => {
        toast.error("عملیات با خطا مواجه شد");
        setFormData({
            stateTitle: "",
            stateTelephoneCode: "",
            stateCountryId: 1,
            id: "",
        });
      });
    setShowEdit(false);
  };
  const modalBodyEdit = (
    <div>
      <form onSubmit={submitEdit}>
        <PageTitle>ویرایش استان </PageTitle>
        <div className="mb-3  md:grid md:grid-cols-2 md:gap-3">
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="stateTitle"
            required="true"
            value={formData.stateTitle}
            placeholder="تهران"
            onChange={handleChange}
            labelTxt="نام استان"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="stateTelephoneCode"
            required="true"
            value={formData.stateTelephoneCode}
            placeholder="021"
            onChange={handleChange}
            labelTxt="پیش شماره"
          />
        </div>
        <div className="flex flex-row">
          <ButtonFieldSuccess
            className="basis-1/2 mx-1"
            btnTxt="ثبت"
            btnType="submit"
          />
          <ButtonFieldError
            className="basis-1/2 mx-1"
            btnTxt="انصراف"
            btnOnClick={() => {
              setShowEdit(false);
              setFormData({
                title: "",
                shortDescription: "",
                imageAlt: "",
                imageTitle: "",
                metaDescription: "",
                keyWords: "",
              });
            }}
            btnType="button"
          />
        </div>
      </form>
    </div>
  );
  //delete
  const [showDel, setShowDel] = useState(false);
  const [delId, setDelId] = useState(null);
  const handleDel = (data) => {
    setShowDel(true);
    setDelId(data.id);
  };

  const submitDel = (e) => {
    e.preventDefault();
    del(`/api/State/Delete/${delId}`)
      .then((response) => {
        setDeleted(response.isSucceeded);
        toast.success(response.description);
      })
      .catch((error) => {
        toast.error("عملیات با خطا مواجه شد");
      });
    setShowDel(false);
  };
  const modalBodyDel = (
    <div>
      <form onSubmit={submitDel}>
        <PageTitle>حذف استان</PageTitle>
        <div className="mb-3">آیا از حذف این استان اطمینان دارید؟؟</div>
        <div className="flex flex-row">
          <ButtonFieldSuccess
            className="basis-1/2 mx-1"
            btnTxt="ثبت"
            btnType="submit"
          />
          <ButtonFieldError
            className="basis-1/2 mx-1"
            btnTxt="انصراف"
            btnOnClick={() => setShowDel(false)}
            btnType="button"
          />
        </div>
      </form>
    </div>
  );
  return (
    <div>
      <div className="flex flex-row w-full justify-between">
        <div>
          <PageTitle>استان ها </PageTitle>
          <BreadCrumb>
            <p>پنل مدیران</p>
            <p>استان ها</p>
          </BreadCrumb>
        </div>
      </div>
      <div className="w-full content">
        <CustomModal modalBody={modalBodyAdd} open={showAdd} />
        <CustomModal modalBody={modalBodyEdit} open={showEdit} />
        <CustomModal modalBody={modalBodyDel} open={showDel} />
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
          handleAdd={handleAdd}
          handleDel={handleDel}
          handleEdit={handleEdit}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
