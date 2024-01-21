import React, { ChangeEvent, useEffect, useState } from "react";
import { Language } from "../../utils/location/types";
import { GetLanguages } from "../../utils/location/functions";
import LanguageDropdown from "./LanguageDropdown";

type PageProps = {
  defaultValue?: Language;
  containerClassName?: string;
  inputClassName?: string;
  onChange?: (e: Language) => void;
  onTextChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  displayNative?: boolean;
};
const LanguageSelect = ({
  containerClassName,
  inputClassName,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  displayNative,
}: PageProps) => {
  const [languagesunfiltered, setLanguages] = useState<Language[]>([]);
  useEffect(() => {
    GetLanguages().then((data) => {
      setLanguages(data);
    });
  }, []);
  return (
    <>
      <div className={containerClassName} style={{ position: "relative" }}>
        <LanguageDropdown
          placeHolder={placeHolder}
          options={languagesunfiltered}
          onChange={(value) => {
            if (onChange) {
              onChange(value as Language);
            }
          }}
          displayNative={displayNative}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputClassName={inputClassName}
        />
      </div>
    </>
  );
};

export default LanguageSelect;
