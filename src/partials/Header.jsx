import React from 'react';
import { useTranslation } from 'react-i18next';

function Header() {
  const [t,i18n]=useTranslation("global")
  
  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

         {/* Left: Title */}
         <div className="mb-4 sm:mb-0">
         <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">{t("header.catalogue")}</h1>
             
            </div>


          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
            {/* Suggested space for translation flags */}
              <button alt="ES" onClick={()=>i18n.changeLanguage("es")}>🇪🇸</button>
              <button alt="EN" onClick={()=>i18n.changeLanguage("en")}>🇬🇧</button>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;