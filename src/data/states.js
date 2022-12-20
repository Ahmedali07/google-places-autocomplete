export const colourStyles = {
    control: (base) => ({
      ...base,
      border: `1px solid #606E7A`,
      borderRadius: "10px",
      width: "100%",
      height: "50px",
  
      color: "#0B4DA2",
      "&:hover": { borderColor: " #0B4DA2" },
  
      boxShadow: "none",
      "@media (min-width: 768px)": {},
    }),
  
    placeholder: (base) => ({
      ...base,
      color: "#888888",
  
      fontFamily: "futuraMedium",
      mediaquery: { fontSize: "17px" },
    }),
    option: (base) => ({
      ...base,
      width: "100%",
  
      fontFamily: "futuraHeavy",
      color: "#0B4DA2",
      background: "white",
    }),
    value: (base) => ({
      ...base,
      color: "white",
      background: "white",
  
      fontFamily: "futuraMedium",
      "@media (max-width: 1513px)": { fontSize: 16 },
      "@media (max-width: 1440px)": { fontSize: 16 },
      "@media (max-width: 1024px)": { fontSize: 16 },
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#0B4DA2",
      "&:hover": { color: " #0B4DA2" },
    }),
    indicatorSeparator: (base) => ({
      border: "none",
    }),
    singleValue: (base) => ({
      color: "#0B4DA2",
  
      fontFamily: "futuraMedium",
      "@media (max-width: 1584px)": { fontSize: 16 },
      "@media (max-width: 1440px)": { fontSize: 16 },
      "@media (max-width: 1024px)": { fontSize: 16 },
      // mediaquery: { width: "400px" }
    }),
    menu: (base) => ({
      ...base,
      width: "100%",
      color: "white",
    }),
    menuList: (base) => ({
      ...base,
      color: "white",
    }),
    dropdownHandle: (base) => ({
      ...base,
      color: "#0B4DA2",
    }),
};

export const statesUS = {
    AK: "Alaska",
    CA: "California",
    DC: "District Of Columbia",
    FL: "Florida",
    GU: "Guam",
    HI: "Hawaii",
    IA: "Iowa",
    KY: "Kentucky",
    LA: "Louisiana",
    MA: "Massachusetts",
    NC: "North Carolina",
    OH: "Ohio",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SD: "South Dakota",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    WY: "Wyoming",
};