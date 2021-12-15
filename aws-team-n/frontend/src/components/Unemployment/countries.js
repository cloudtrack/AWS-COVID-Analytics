import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

/** Region names for invalid iso codes */
const regionNames = {
  EA: "Euro Area (19 countries)",
  EU: "European Union (27 countries)",
  OECD: "OECD (Total)",
  "G-7": "Group of Seven (G7)",
};

export const getCountryName = (iso) => {
  const name = countries.getName(iso.toUpperCase(), "en", {
    select: "official",
  });
  // return iso code if country name undefined
  return regionNames[iso] || name || iso;
};

/** List containing Alpha-3 iso codes of G7 member countries:
 * Canada, France, Germany, Italy, Japan,
 * the United Kingdom, the United States
 */
export const g7Countries = ["CAN", "FRA", "DEU", "ITA", "JPN", "GBR", "USA"];

/**
 * List containing Alpha-3 iso codes of EA countries:
 * The euro area (also known as the eurozone) consists of 19 countries that use the Euro: Belgium
 * Germany, Ireland, Spain, France, Italy, Luxembourg, the Netherlands, Austria, Portugal
 * Finland, Greece, Slovenia, Cyprus, Malta, Slovakia, Estonia, Latvia and Lithuania.
 */
export const EACountries = [
  "AUT",
  "BEL",
  "DEU",
  "IRL",
  "ESP",
  "ITA",
  "LUX",
  "NLD",
  "PRT",
  "FIN",
  "GRE",
  "SVN",
  "SVK",
  "EST",
  "LVA",
  "LTU",
];

/** List containing Alpha-3 iso codes of EU member countries:
 * Austria, Belgium, Bulgaria, Croatia, Republic of Cyprus, Czech Republic, Denmark, Estonia,
 * Finland, France, Germany, Greece, Hungary, Ireland, Italy, Latvia, Lithuania, Luxembourg,
 * Malta, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia, Spain and Sweden.
 */
export const EUCountries = [
  ...EACountries,
  "CZE",
  "DNK",
  "FRA",
  "HUN",
  "POL",
  "ROU",
  "SWE",
];
