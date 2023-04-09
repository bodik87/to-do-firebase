import { createContext, useContext, useState } from "react";

const languages = ["ua", "en"];
const LangContext = createContext();

export const LangContextProvider = ({ children }) => {
  const [userLanguage, setUserLanguage] = useState(
    window.localStorage.getItem("lang") || languages[0]
  );

  const changeLanguages = (lang) => {
    window.localStorage.setItem("lang", lang);
    setUserLanguage(window.localStorage.getItem("lang"));
  };

  return (
    <LangContext.Provider value={{ userLanguage, changeLanguages }}>
      {children}
    </LangContext.Provider>
  );
};

export const CurrentLanguage = () => {
  return useContext(LangContext);
};
