import React from "react";
import BreadCrumb from "../../components/breadCrumb/BreadCrumb";
import PageTitle from "../../components/PageTitle/PageTitle";
import Button from '@mui/material/Button';
import DataTable from "../../components/dataTable/DataTable";

export default function CateguryPage() {
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
        <div>
          <Button variant="outlined">افزودن</Button>
        </div>
      </div>
      <div className="w-full content">
        <DataTable></DataTable>
      </div>

    </div>
  );
}
