import React from "react";
import { Dropdown } from "semantic-ui-react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import CustomTable from "../../components/customtable";

const HISTORIAL_DATA_INDEX = 5;

const CurrencyConverterContainer= ({
  toData,
  fromData,
  isLoading,
  countryOptions,
  handleCurrencySwap,
  handleCurrencyChanged,
  handleCurrencyConversion,
  historicalData,
}) => {
  return (
    <MainWrapperStyled>
      <div className="converter">
        <div className="from__container">
          <div className="top_title">From</div>
          <div className="converter__select">
            <Dropdown
              placeholder="Choose your currency"
              fluid
              search
              selection
              loading={isLoading}
              value={fromData.currency}
              onChange={(e, data) =>
                handleCurrencyChanged({
                  type: "fromData",
                  currency: data.value,
                })
              }
              options={countryOptions}
            />
          </div>
          <div className="coverter__input">
            <span className="currency">{fromData.symbol}</span>
            <input
              className=""
              placeholder="0"
              value={fromData.value}
              onChange={(e) => {
                const amount = e.target.value;
                handleCurrencyConversion({
                  fromCurrency: fromData.currency.toLowerCase(),
                  toCurrency: toData.currency.toLowerCase(),
                  amount,
                });
              }}
            />
          </div>
        </div>

        <div className="swap__container">
          <div
            className="swap__container__mini"
            onClick={() => handleCurrencySwap({ fromData, toData })}
          >
            <i className="icon ion-md-swap"></i>
          </div>
        </div>

        <div className="to__container">
          <div className="top_title">To</div>
          <div className="converter__select">
            <Dropdown
              placeholder="Choose your currency"
              fluid
              search
              selection
              value={toData.currency}
              onChange={(e, data) =>
                handleCurrencyChanged({ type: "toData", currency: data.value })
              }
              options={countryOptions}
            />
          </div>
          <div className="coverter__input">
            <span className="currency">{toData.symbol}</span>
            <input className="" placeholder="0" value={toData.value} readOnly />
          </div>
        </div>
      </div>

      <CustomTable data={historicalData.slice(0, HISTORIAL_DATA_INDEX)} />
    </MainWrapperStyled>
  );
};

//get props from container
CurrencyConverterContainer.propTypes = {
  fromData: PropTypes.object.isRequired,
  toData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  conversion: PropTypes.object.isRequired,
  countryOptions: PropTypes.array.isRequired,
  handleCurrencySwap: PropTypes.func.isRequired,
  handleCurrencyChanged: PropTypes.func.isRequired,
  handleCurrencyConversion: PropTypes.func.isRequired,
};

export default CurrencyConverterContainer;


/*TODO: Need to organize css to seperate file */
const MainWrapperStyled = styled.div`
  max-width: 1000px;
  padding: 0;
  margin: 0 auto;
  @media (max-width: 765px) {
    padding: 20px;
  }

  .converter {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media (max-width: 765px) {
      flex-direction: column;
    }
  }

  .converter .from__container,
  .converter .to__container {
    flex: 0 0 43%;
    display: flex;
    flex-direction: column;
    @media (max-width: 765px) {
      width: 100%;
    }
  }

  .converter .swap__container {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    padding: 10px;
    margin-top: 23px;
    display: flex;
    align-items: center;
    background: #4987df59;
    @media (max-width: 765px) {
      height: 50px;
      width: 50px;
      justify-content: center;
      margin: 0 auto;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }

  .swap__container__mini:hover {
    cursor: pointer;
    background: #000;
  }

  .swap__container__mini:hover i {
    color: #fff;
  }

  .swap__container__mini {
    flex: 1;
    display: flex;
    min-height: 100%;
    min-width: 100%;
    border-radius: 50%;
    background: #4987df;
    align-items: center;
    justify-content: center;
  }

  .swap__container__mini i {
    font-size: 22px;
    color: #ffffff;
  }

  .from__container select,
  .to__container select {
    height: 50px;
    width: 100%;
    outline: none;
    margin-bottom: 20px;
    background: transparent;
    border: 1px solid #eee;
  }

  .coverter__input {
    position: relative;
    margin-top: 20px;
  }

  .coverter__input input {
    height: 100px;
    width: 100%;
    border: none;
    outline: none;
    font-size: 52px;
    font-weight: 200;
    text-indent: 50px;
    margin-bottom: 20px;
    color: rgba(0, 0, 0, 0.6);
    background: transparent;
    border-bottom: 1px solid #eee;
  }

  .coverter__input span.currency {
    top: 40px;
    font-size: 22px;
    font-weight: 100;
    position: absolute;
    color: rgba(0, 0, 0, 0.6);
  }

  .currency__chart__history {
    margin-top: 60px;
  }

  .chart__view__menu {
    display: flex;
    margin-bottom: 40px;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.02);

    @media (max-width: 765px) {
      flex-direction: column;
    }
  }

  .chart__view__menu .cv__menu__item {
    padding: 20px;
  }

  .chart__date__range {
    display: flex;
    align-items: center;
  }

  .chart__date__range span {
    margin-right: 20px;
  }

  .top_title {
    font-size: 11px;
    margin-bottom: 5px;
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;
