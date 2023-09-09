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

export default function CateguryPage() {
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
  ///add
  const [showAdd, setShowAdd] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    imageAlt: "",
    imageTitle: "",
    metaDescription: "",
    keyWords: "",
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
      post(`/api/Administration/TrainingClassCategory/Create`, formData, token)
        .then((response) => {
          toast.success(response.description);
          setAdded(response.isSucceeded);
          setFormData({
            title: "",
            shortDescription: "",
            imageAlt: "",
            imageTitle: "",
            metaDescription: "",
            keyWords: "",
          });
        })
        .catch((error) => {
          toast.error("عملیات با خطا مواجه شد");
          setFormData({
            title: "",
            shortDescription: "",
            imageAlt: "",
            imageTitle: "",
            metaDescription: "",
            keyWords: "",
          });
        });
      setShowAdd(false);
    }
  };
  const modalBodyAdd = (
    <div>
      <form onSubmit={submitAdd}>
        <PageTitle>افزودن دسته بندی</PageTitle>
        <div className="mb-3">
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="title"
            required="true"
            value={formData.title}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="عنوان"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="imageAlt"
            required="true"
            value={formData.imageAlt}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="متن تصویر"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="imageTitle"
            required="true"
            value={formData.imageTitle}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="عنوان تصویر"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="keyWords"
            required="true"
            value={formData.keyWords}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="کلمات کلیدی "
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="metaDescription"
            required="true"
            value={formData.metaDescription}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="توضیحات متا"
          />
          <TextareaField
            className="mt-2 mb-4"
            type="text"
            inputName="shortDescription"
            required="true"
            value={formData.shortDescription}
            placeholder="ورزشی گروهی شامل 12 نفر .."
            onChange={handleChange}
            labelTxt="توضیحات تکمیلی"
          />
          {/* <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>} */}
        </div>

        {/* <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div> */}

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

  //edit
  const [showEdit, setShowEdit] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const handleEdit = (data) => {
    get(
      `/api/Administration/TrainingClassCategory/GetDetails/${data.id}`,
      token
    ).then((response) => {
      setFormData({
        title: response.title,
        shortDescription: response.shortDescription,
        imageAlt: response.imageAlt,
        imageTitle: response.imageTitle,
        metaDescription: response.metaDescription,
        keyWords: response.keyWords,
      });
      setShowEdit(true);
      setEditedId(data.id);
    });
  };
  const submitEdit = (e) => {
    e.preventDefault();
    put(
      `/api/Administration/TrainingClassCategory/Put/${editedId}`,
      formData,
      token
    )
      .then((response) => {
        toast.success(response.description);
        setEdited(response.isSucceeded);
        setFormData({
          title: "",
          shortDescription: "",
          imageAlt: "",
          imageTitle: "",
          metaDescription: "",
          keyWords: "",
          id: "",
        });
      })
      .catch((error) => {
        toast.error("عملیات با خطا مواجه شد");
        setFormData({
          title: "",
          shortDescription: "",
          imageAlt: "",
          imageTitle: "",
          metaDescription: "",
          keyWords: "",
          id: "",
        });
      });
    setShowEdit(false);
  };
  const modalBodyEdit = (
    <div>
      <form onSubmit={submitEdit}>
        <PageTitle>ویرایش دسته بندی</PageTitle>
        <div className="mb-3">
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="title"
            required="true"
            value={formData.title}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="عنوان"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="imageAlt"
            required="true"
            value={formData.imageAlt}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="متن تصویر"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="imageTitle"
            required="true"
            value={formData.imageTitle}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="عنوان تصویر"
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="keyWords"
            required="true"
            value={formData.keyWords}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="کلمات کلیدی "
          />
          <InputField
            className="mt-4 mb-2"
            type="text"
            inputName="metaDescription"
            required="true"
            value={formData.metaDescription}
            placeholder="فوتبال"
            onChange={handleChange}
            labelTxt="توضیحات متا"
          />
          <TextareaField
            className="mt-2 mb-4"
            type="text"
            inputName="shortDescription"
            required="true"
            value={formData.shortDescription}
            placeholder="ورزشی گروهی شامل 12 نفر .."
            onChange={handleChange}
            labelTxt="توضیحات تکمیلی"
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
    del(`/api/Administration/TrainingClassCategory/Delete/${delId}`)
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
        <PageTitle>حذف دسته بندی</PageTitle>
        <div className="mb-3">آیا از حذف این دسته اطمینان دارید؟؟</div>
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
          <PageTitle>دسته بندی</PageTitle>
          <BreadCrumb>
            <p>پنل مدیران</p>
            <p>دسته بندی ها</p>
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
