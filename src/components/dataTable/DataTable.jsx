import React from "react";
import './dataTableStyle.css'
import SearchBox from "../searchbox/SearchBox";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

export default function DataTable() {
  return (
    <div className="w-full bg-white rounded-md shadow-gray-dark table-container mt-5">
      <table class="table-auto w-full ">
        <thead>
          <tr>
            <th className="py-5 text-center text-lg text-gray font-bold">نام</th>
            <th className="py-5 text-center text-lg text-gray font-bold">تخصص</th>
            <th className="py-5 text-center text-lg text-gray font-bold">سال</th>
            <th className="py-5 text-center text-lg text-gray font-bold">حدف</th>
            <th className="py-5 text-center text-lg text-gray font-bold">ویرایش</th>
          </tr>
        </thead>
        <tbody className="text-center">
        <tr className="py-5">
            <td className="text-center py-3"><SearchBox className='cursor-pointer' /></td>
            <td className="text-center py-3"><SearchBox className='cursor-pointer' /></td>
            <td className="text-center py-3"><SearchBox className='cursor-pointer' /></td>
          </tr>
          <tr className="py-3">
            <td className="text-center py-4">The Sliding Mr. Bones</td>
            <td className="text-center py-4">Malcolm Lockyer</td>
            <td className="text-center py-4">1961</td>
            <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
            <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
          </tr>
          <tr className="py-4">
            <td className="text-center py-4">Witchy Woman</td>
            <td className="text-center py-4">The Eagles</td>
            <td className="text-center py-4">1972</td>
            <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
            <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
          </tr>
          <tr className="py-4">
            <td className="text-center py-4">Shining Star</td>
            <td className="text-center py-4">Earth, Wind, and Fire</td>
            <td className="text-center py-4">1975</td>
            <td className="text-center py-4"><TrashIcon className="h-6 w-6 cursor-pointer text-secondary hover:text-primary" /></td>
            <td className="text-center py-4"><PencilSquareIcon className="h-6 w-6 cursor-pointer text-primary hover:text-secondary" /></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
