import { useEffect, useState } from "react";
import { Input } from "semantic-ui-react";
import styled from "@emotion/styled";
import CurrencyConverterContainer from "./components/currencyconverter";
import { CURRENCY_OPTIONS } from "../utils/currienciesData";
import { usePolling } from "../utils/usePolling";
import { formatCurrency, getCurrentDataAndTime, getRandomFXRate } from "../utils/helper";


const REFRESH_INTERVAL = 3000;
const FX_INTERVAL = 0.05;

const CurrencyConverter = () =>{
  const initialState = {
    fromData: {
      currency: "eur",
      symbol: "€",
      value: 1,
    },
    toData: {
      currency: "usd",
      symbol: "$",
      value: 1.1,
    },
    conversion: {},
    isLoading: false,
    countryOptions: CURRENCY_OPTIONS,
    historicalData: [
      {
        fxRealtime: 1.1,
        fxOverride: 1.1,
        fromCurrency: "€ 1",
        toCurrency: "$ 1.1",
      },
    ],
    fxRates: {
      usd: {
        eur: "1",
        can: "",
        aus: "",
      },
      eur: {
        usd: "1.1",
        can: "",
        aus: "",
      },
    },
  };

  const [exchangeRateState, setExchangeRateState] = useState(initialState);
  const {fxRates, fromData: {currency:fromCurrency, value: fromValue}, toData: {currency:toCurrency}, historicalData} = exchangeRateState;
  const currentFxRate =  Number(fxRates[fromCurrency][toCurrency]);

  usePolling(async () => {
    const minValue = currentFxRate - FX_INTERVAL;
    const maxValue = Number(currentFxRate + FX_INTERVAL).toFixed(2);
    const value = getRandomFXRate(minValue, maxValue, 2);
    updateCurrentFXRate(value);
    
  }, REFRESH_INTERVAL);

  useEffect(() => {

    
    const toData = { ...exchangeRateState.toData, value: currentFxRate };
    const fromCurrencyInfo = CURRENCY_OPTIONS?.find((item) => item.value.toLowerCase() === fromCurrency);
    const toCurrencyInfo = CURRENCY_OPTIONS?.find((item) => item.value.toLocaleLowerCase() === toCurrency);

    const updateHistoricalData = [{
      fxRealtime: 1.1,
      fxOverride: Number(currentFxRate),
      fromCurrency: `${fromCurrencyInfo?.symbol} ${fromValue}`,
      toCurrency: `${toCurrencyInfo?.symbol} ${currentFxRate}`
    },
    ...historicalData
   ]
   updateExchangeState({toData, historicalData: updateHistoricalData });
    // eslint-disable-next-line
  }, [exchangeRateState.fxRates])

  const handleCurrencyChanged = (selectedData) => {
    const { type, currency } = selectedData;
    const findSelectedCurrency = CURRENCY_OPTIONS?.find(
      (item) => item.value === currency
    );
    updateExchangeState({
      [type]: { currency, value: 1, symbol: findSelectedCurrency?.symbol},
    });
  };

  const handleCurrencySwap = ({ fromData, toData }) => {
    updateExchangeState({ fromData: toData, toData: fromData });
  };

  const handleCurrencyConversion = ({ fromCurrency, toCurrency, amount }) => {
    const {historicalData, fxRates} = exchangeRateState;
    const fromData = { ...exchangeRateState.fromData, value: amount };
    let toData = { ...exchangeRateState.toData, value: amount };
    const fxOverrideRate = fxRates[fromCurrency][toCurrency];
    let newFxRate = 0;
   
    if (fromCurrency !== toCurrency) {
      newFxRate = formatCurrency(
        fxOverrideRate * amount,
        2
      );
      toData = { ...exchangeRateState.toData, value: newFxRate };
    }
    const fromCurrencyInfo = CURRENCY_OPTIONS?.find((item) => item.value.toLowerCase() === fromCurrency);
    const toCurrencyInfo = CURRENCY_OPTIONS?.find((item) => item.value.toLocaleLowerCase() === toCurrency);
    
    let updateHistoricalData = historicalData;
    
    if (exchangeRateState?.fromData.value !== Number(amount)) {
       updateHistoricalData = [{
        fxRealtime: 1.1,
        fxOverride: Number(fxOverrideRate),
        fromCurrency: `${fromCurrencyInfo?.symbol} ${amount}`,
        toCurrency: `${toCurrencyInfo?.symbol} ${newFxRate}`
      },
      ...historicalData
     ]
    }

    updateExchangeState({ fromData, toData, historicalData: updateHistoricalData });
  };

  const updateExchangeState = (updatedData) => {
    setExchangeRateState({ ...exchangeRateState, ...updatedData });
  };

  const onDefaultFxrateHandler = (event) => {
    const newfxRate = event.target.value;
    updateCurrentFXRate(newfxRate);


  }

  const updateCurrentFXRate = (value) => {
    const {fxRates, fromData: {currency: fromCurrency}, toData: {currency: toCurrency}} = exchangeRateState;
    const updatedFxRates = {...fxRates, [fromCurrency]: {...fxRates[fromCurrency], [toCurrency]: value}};
    updateExchangeState({fxRates: updatedFxRates})
  }

  return (
    <MainWrapperStyled>
      <ContentWrapperStyled>
        <HeaderWrapperStyled>
          <LeftWrapperStyled>
            <h1>Currency Converter</h1>
            <p>{`Today, ${getCurrentDataAndTime()}`}</p>
          </LeftWrapperStyled>
         
          <RightWrapperStyled>
           <p>FxRate: </p>
           <Input value={currentFxRate} onChange={onDefaultFxrateHandler} />
          </RightWrapperStyled>
        </HeaderWrapperStyled>

        <CurrencyConverterContainer
          {...exchangeRateState}
          handleCurrencyChanged={handleCurrencyChanged}
          handleCurrencySwap={handleCurrencySwap}
          handleCurrencyConversion={handleCurrencyConversion}
        />
      </ContentWrapperStyled>
    </MainWrapperStyled>
  );
}

export default CurrencyConverter;

const MainWrapperStyled = styled.div`
  padding: 60px 0;
`;

const ContentWrapperStyled = styled.div`
  max-width: 1000px;
  padding: 0;
  margin: 0 auto;
  @media (max-width: 765px) {
    padding: 20px;
  }
`;

const HeaderWrapperStyled = styled.div`
  margin-bottom: 40px;
  display: flex;
 

  h1: {
    margin-bottom: 40px;
    font-size: 28px;
    margin: 0;
    font-size: 12px;
    margin-top: 2px;
    color: #8c8a8a;
    font-weight: 500;
  }

  ,

  p: {
    font-size: 28px;
    margin: 0;
    font-size: 12px;
    margin-top: 2px;
    color: #8c8a8a;
    font-weight: 500;
  }
`;

const RightWrapperStyled = styled.div`
width: 30%;
display: flex;
justifyCenter: center;
alignItems: center;
p {
  margin-top: 15px;
  margin-right: 3px;
}
`;
const LeftWrapperStyled = styled.div`
  width: 70%;
`;
