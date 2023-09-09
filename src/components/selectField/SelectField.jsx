
import React from 'react'
import './selectFieldStyle.css'

export default function SelectField({ children, handleSelect, lableText, placeholder, value }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="mb-0.5">
      <label className="sport-label">{lableText}</label>
      <select class="sport-select" value={value} name="" id="" dir="rtl" placeholder={lableText} onChange={handleSelect}>
        <option>{placeholder ? placeholder : 'انتخاب کنید'}</option>
        {children}
      </select>
    </div>
  )
}




