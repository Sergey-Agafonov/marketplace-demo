import moment from "moment";

const AUCTION_FEE = 25;
const BUY_NOW_FEE = 35;
const COMPANY_DISCOUNT = 5;
const END_DAY_DISCOUNT = 10;

class AbstractAdStrategy {
  getTotalFee(price) {
    if (typeof price !== "number" || Number.isNaN(price)) {
      throw new TypeError("Invalid price");
    }
    return this.fee + price;
  }
}

export class BuyNowStrategy extends AbstractAdStrategy {
  get fee() {
    return BUY_NOW_FEE;
  }
}

export class AuctionStrategy extends AbstractAdStrategy {
  get fee() {
    return AUCTION_FEE;
  }

  // if 'end date' discount desired in 'buy now' strategy, move the following 2 methods to base strategy
  _getEndDateDiscount(endDate) {
    // TODO validate date
    return moment(endDate).isSame(moment(), "day") ? END_DAY_DISCOUNT : 0;
  }

  getTotalFee(price, endDate) {
    return super.getTotalFee(price) - this._getEndDateDiscount(endDate);
  }
}

// TODO add static type check if move to TypeScript, or use dynamic duck typing
export const WithCompanyDiscount = (AdStrategy) =>
  class extends AdStrategy {
    getTotalFee(...args) {
      return super.getTotalFee(...args) - COMPANY_DISCOUNT;
    }
  };
