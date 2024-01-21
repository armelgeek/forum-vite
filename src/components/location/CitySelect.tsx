import React, { ChangeEvent, useEffect, useState } from "react";
import { City } from "../../utils/location/types";
import { GetCity } from "../../utils/location/functions";
import Dropdown from "./Dropdown";
type PageProps = {
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: City) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: City;
  countryid: number;
  stateid: number;
  placeHolder?: string;
};

const CitySelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  countryid,
  stateid,
  placeHolder,
}: PageProps) => {
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    if (countryid) {
      GetCity(countryid, stateid).then((data) => {
        setCities(data);
      });
    }
  }, [countryid, stateid]);
  return (
    <>
      <div style={{ position: "relative" }}>
        <Dropdown
          placeHolder={placeHolder}
          options={cities}
          onChange={(value) => {
            if (onChange) {
              onChange(value as City);
            }
          }}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default CitySelect;
