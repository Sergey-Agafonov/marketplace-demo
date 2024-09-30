import {
  AuctionStrategy,
  BuyNowStrategy,
  WithCompanyDiscount,
} from "./adFeeStrategies";

export const USER_TYPE = Object.freeze({ PERSON: 0, COMPANY: 1 });
export const AD_TYPE = Object.freeze({ AUCTION: 0, BUY_NOW: 1 });

const adStrategies = {
  [AD_TYPE.AUCTION]: {
    [USER_TYPE.PERSON]: AuctionStrategy,
    [USER_TYPE.COMPANY]: WithCompanyDiscount(AuctionStrategy),
  },
  [AD_TYPE.BUY_NOW]: {
    [USER_TYPE.PERSON]: BuyNowStrategy,
    [USER_TYPE.COMPANY]: WithCompanyDiscount(BuyNowStrategy),
  },
};

const adStrategyFactory = ({ itemType, userType }) => {
  const constructor = adStrategies[itemType]?.[userType];
  if (!constructor)
    throw new Error(
      `Unknown combination of userType: ${userType} and itemType: ${itemType}`
    );
  return new constructor();
};

export class Calculator {
  getFee({ userType, itemType, price, endDate }) {
    return adStrategyFactory({ itemType, userType }).getTotalFee(
      price,
      endDate
    );
  }
}
