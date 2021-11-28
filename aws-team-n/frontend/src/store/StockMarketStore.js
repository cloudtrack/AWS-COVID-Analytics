const initialState = {
  data: [],
  date_africa : [],
  egypt: [],
  southafrica: [],
  date_asia: [],
  china: [],
  korea: [],
  hongkong: [],
  japan: [],
  india: [],
  date_oceania: [],
  australia: [],
  newzealand: [],
  date_northamerica: [],
  usa: [],
  canada: [],
  mexico: [],
  date_southamerica: [],
  peru: [],
  chile: [],
  brazil: [],
  argentina: [],
  
  date_europe: [],
  uk: [],
  germany: [],
  swiss: [],
  italy: [],
  france: [],
  netherlands: [],
  
  table: [],
  geo: [],

  date_krpredict: [],
  krreal: [],
  krpredict: [],
  date_uspredict: [],
  usreal: [],
  uspredict: [],

  date_sector: [],
  CMPrice: [],
  CMVolume: [],
  CDPrice: [],
  CDVolume: [],
  CSPrice: [],
  CSVolume: [],
  ECPrice: [],
  ECVolume: [],
  FPrice: [],
  FVolume: [],
  HIPrice: [],
  HIVolume: [],
  ITPrice: [],
  ITVolume: [],
  SMPrice: [],
  SMVolume: [],
};

const _getAfrica = (table) => {
  return { type: 'line/GET_AFRICA', table };
};

const _getAsia = (table) => {
  return { type: 'line/GET_ASIA', table };
};

const _getEurope = (table) => {
  return { type: 'line/GET_EUROPE', table };
};

const _getNAmerica = (table) => {
  return { type: 'line/GET_NAMERICA', table };
};

const _getOceania = (table) => {
  return { type: 'line/GET_OCEANIA', table };
};

const _getSAmerica = (table) => {
  return { type: 'line/GET_SAMERICA', table };
};

const _getTable = (table) => {
  return { type: 'table/GET_TABLE', table };
}

const _getGeo = (table) => {
  return { type: 'geo/GET_GEO', table}
}

const _getKRPredict = (table) => {
  return { type: 'predict/GET_KRPREDICT', table}
}

const _getUSPredict = (table) => {
  return { type: 'predict/GET_USPREDICT', table}
}

const _getSectorOverview = (table) => {
  return { type: 'sector/GET_SECTOROVERVIEW', table };
};


export const getAfrica = () => async (dispatch) => {
  try {
    const response = await fetch('./continent/africa.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getAfrica(table));
  } catch (e) {}
};

export const getAsia = () => async (dispatch) => {
  try {
    const response = await fetch('./continent/asia.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getAsia(table));
  } catch (e) {}
};

export const getEurope = () => async (dispatch) => {
  try {
    const response = await fetch('./continent/europe.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getEurope(table));
  } catch (e) {}
};

export const getNAmerica = () => async (dispatch) => {
  try {
    const response = await fetch('./continent/namerica.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getNAmerica(table));
  } catch (e) {}
};

export const getOceania = () => async (dispatch) => {
  try {
    const response = await fetch('./continent/oceania.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getOceania(table));
  } catch (e) {}
};

export const getSAmerica = () => async (dispatch) => {
  try {
    const response = await fetch('./continent/samerica.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getSAmerica(table));
  } catch (e) {}
};

export const getTable = () => async (dispatch) => {
  try{
    const response = await fetch('./worldrecover/table.json');
    const table = await response.json();
    dispatch(_getTable(table));

  } catch (e) {}
}

export const getGeo = () => async (dispatch) => {
  try{
    const response = await fetch('./worldrecover/geo.csv');
    const data = await response.text();

    dispatch(_getGeo(data));
  } catch (e) {}
}

export const getKRPredict = () => async (dispatch) => {
  try{
    const response = await fetch('./predict/krpredict.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getKRPredict(table));
  } catch (e) {}
}

export const getUSPredict = () => async (dispatch) => {
  try{
    const response = await fetch('./predict/usapredict.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getUSPredict(table));
  } catch (e) {}
}

export const getSectorOverview = () => async (dispatch) => {
  try {
    const response = await fetch('./kospisector/sectorline.csv');
    const data = await response.text();
    const table = data.split('\n').slice(1);

    dispatch(_getSectorOverview(table));
  } catch (e) {}
};

export default function GraphReducer(state = initialState, action) {
  switch (action.type) {
    case 'line/GET_AFRICA':
      let date_africa = [];
      let egypt = [];
      let sa = [];
      action.table.forEach((row) => {
        const columns = row.split(',');
        const date = columns[0];
        date_africa.push(date);
        egypt.push(columns[1] / 752.2);
        sa.push(columns[2] / 52464.8);
      });
      return {
        ...state,
        date_africa: date_africa,
        egypt: egypt,
        southafrica: sa,
      };

    case 'line/GET_ASIA':
      let date_asia = [];
      let china = [];
      let korea = [];
      let japan = [];
      let india = [];
      let hongkong = [];
  
      action.table.forEach((row) => {
        const columns = row.split(',');
        date_asia.push(columns[0]);
        china.push(columns[1]/3044.9)
        korea.push(columns[2]/2129.7)
        hongkong.push(columns[3]/28875.6)
        india.push(columns[4]/220.9)
        japan.push(columns[5]/21730)
      });
      return {
        ...state,
        date_asia: date_asia,
        china: china,
        korea: korea,
        hongkong: hongkong,
        india: india,
        japan: japan
      };

    case 'line/GET_EUROPE':
      let date_europe = [];
      let uk = [];
      let italy = [];
      let swiss = [];
      let germany = [];
      let france = [];
      let netherlands = [];

      action.table.forEach((row) => {
        const columns = row.split(',');
        date_europe.push(columns[0]);
        uk.push(columns[1]/7497.5)
        italy.push(columns[2]/21183)
        swiss.push(columns[3]/9970)
        germany.push(columns[4]/12521.4)
        france.push(columns[5]/5567.9)
        netherlands.push(columns[6]/568.3)
      });
      return {
        ...state,
        date_europe: date_europe,
        uk: uk,
        italy: italy,
        swiss: swiss,
        germany: germany,
        france: france,
        netherlands: netherlands
      };

    case 'line/GET_NAMERICA':
      let date_northamerica = [];
      let usa = [];
      let canada = [];
      let mexico = [];
      action.table.forEach((row) => {
        const columns = row.split(',');
        date_northamerica.push(columns[0]);
        usa.push(columns[1]/8109.1)
        canada.push(columns[2]/16471.3)
        mexico.push(columns[3]/43483.2)
      });
      return {
        ...state,
        date_northamerica: date_northamerica,
        usa: usa,
        canada: canada,
        mexico: mexico
      };

    case 'line/GET_OCEANIA':
      let date_oceania = [];
      let newzealand = [];
      let australia = [];

      action.table.forEach((row) => {
        const columns = row.split(',');
        date_oceania.push(columns[0]);
        australia.push(columns[1]/6648.1)
        newzealand.push(columns[2]/1777.3)
      });
      return {
        ...state,
        date_oceania: date_oceania,
        australia: australia,
        newzealand: newzealand,
      };

    case 'line/GET_SAMERICA':
      let date_southamerica = [];
      let peru = [];
      let brazil = [];
      let chile = [];
      let argentina = [];
      action.table.forEach((row) => {
        const columns = row.split(',');
        date_southamerica.push(columns[0]);
        argentina.push(columns[1]/101340)
        brazil.push(columns[2]/41507.5)
        chile.push(columns[3]/25748.9)
        peru.push(columns[4]/20727.8)
    });
      return {
        ...state,
        date_southamerica: date_southamerica,
        peru: peru,
        brazil: brazil,
        chile: chile,
        argentina: argentina
      };

    case 'table/GET_TABLE':
      return {
        ...state,
        table: action.table,
      };
    
    case 'geo/GET_GEO':
      return {
        ...state,
        geo: action.table,
      }
    
    case 'predict/GET_KRPREDICT':
      let date_krpredict = [];
      let krreal = [];
      let krpredict = [];
      action.table.forEach((row) => {
        const columns = row.split(',');
        const date = columns[0];
        date_krpredict.push(date);
        krreal.push(columns[1]);
        krpredict.push(columns[2]);
      });
      return {
        ...state,
        date_krpredict: date_krpredict,
        krreal: krreal,
        krpredict: krpredict,
      }

    case 'predict/GET_USPREDICT':
      let date_uspredict = [];
      let usreal = [];
      let uspredict = [];
      action.table.forEach((row) => {
        const columns = row.split(',');
        const date = columns[0];
        date_uspredict.push(date);
        usreal.push(columns[1]);
        uspredict.push(columns[2]);
      });
      return {
        ...state,
        date_uspredict: date_uspredict,
        usreal: usreal,
        uspredict: uspredict
      }

    case 'sector/GET_SECTOROVERVIEW':
      let date_sector = [];
      let CMPrice = [];
      let CMVolume = [];
      let CDPrice = [];
      let CDVolume = [];
      let CSPrice = [];
      let CSVolume = [];
      let ECPrice = [];
      let ECVolume = [];
      let FPrice = [];
      let FVolume = [];
      let HIPrice = [];
      let HIVolume = [];
      let ITPrice = [];
      let ITVolume = [];
      let SMPrice = [];
      let SMVolume = [];
      action.table.forEach((row) => {
        const columns = row.split(',');
        date_sector.push(columns[0]);
        CMPrice.push(columns[1]/282.8);
        CMVolume.push(columns[2]);
        CDPrice.push(columns[3]/1430.5);
        CDVolume.push(columns[4]);
        CSPrice.push(columns[5]/1118.9);
        CSVolume.push(columns[6]);
        ECPrice.push(columns[7]/1248.9);
        ECVolume.push(columns[8]);
        FPrice.push(columns[9]/728.6);
        FVolume.push(columns[10]);
        HIPrice.push(columns[11]/291.9);
        HIVolume.push(columns[12]);
        ITPrice.push(columns[13]/2089.9);
        ITVolume.push(columns[14]);
        SMPrice.push(columns[15]/791.4);
        SMVolume.push(columns[16]);
        });
      return {
        ...state,
        date_sector: date_sector,
        CMPrice: CMPrice,
        CMVolume: CMVolume,
        CDPrice: CDPrice,
        CDVolume: CDVolume,
        CSPrice: CSPrice,
        CSVolume: CSVolume,
        ECPrice: ECPrice,
        ECVolume: ECVolume,
        FPrice: FPrice,
        FVolume: FVolume,
        HIPrice: HIPrice,
        HIVolume: HIVolume,
        ITPrice: ITPrice,
        ITVolume: ITVolume,
        SMPrice: SMPrice,
        SMVolume: SMVolume,
      }

    default:
      break;
  }
  return state;
}
