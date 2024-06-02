import "./style.scss";
import Logo from "../../assets/images/logo.svg";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import flagEnglish from "../../assets/images/en.svg";
import flagAzerbaijan from "../../assets/images/az.svg";
import { useState } from "react";
import { useTranslation } from 'react-i18next';

interface Language {
  value: string;
  flag: string;
}

const languages: Language[] = [
  { value: "az", flag: flagAzerbaijan },
  { value: "en", flag: flagEnglish },
];

const Header = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const [language, setLanguage] = useState("az");

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    const language = event.target.value
    setLanguage(language);
    i18n.changeLanguage(language);
  };


  return (
    <header className="header">
      <a href="/">
        <img src={Logo} alt="Logo" />
      </a>
      <h1>{t("welcome")}</h1>
      <FormControl variant="standard">
        <Select value={language} onChange={handleChangeLanguage} className="header__lang">
          {languages.map((lang) => (
            <MenuItem key={lang.value} value={lang.value}>
              <img
                src={lang.flag}
                alt={`${lang.value} Flag`}
                className="header__lang__img"
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </header>
  );
};

export default Header;
