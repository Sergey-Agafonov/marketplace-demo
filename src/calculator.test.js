import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Calculator } from "./calculator";

describe("Calculator class", () => {
  let calculator;

  beforeEach(() => (calculator = new Calculator()));

  describe("getFee method", () => {
    let endDate;

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 8, 8));
    });

    afterEach(() => vi.useRealTimers());

    describe("when ad ends today", () => {
      beforeEach(() => (endDate = "2024-09-08"));

      it("returns correct fee for 'auction' by 'person'", () =>
        expect(
          calculator.getFee({
            userType: 0,
            itemType: 0,
            price: 10,
            endDate,
          })
        ).toBe(25));

      it("returns correct fee for 'auction' by 'company'", () =>
        expect(
          calculator.getFee({
            userType: 1,
            itemType: 0,
            price: 10,
            endDate,
          })
        ).toBe(20));

      it("returns correct fee for 'buy now ad' by 'company'", () =>
        expect(
          calculator.getFee({
            userType: 1,
            itemType: 1,
            price: 10,
            endDate,
          })
        ).toBe(40));

      it("returns correct fee for 'buy now ad' by 'person'", () =>
        expect(
          calculator.getFee({
            userType: 0,
            itemType: 1,
            price: 10,
            endDate,
          })
        ).toBe(45));
    });

    describe("when ad ends in future", () => {
      beforeEach(() => (endDate = "2024-12-12"));

      it("returns correct fee for 'auction' by 'person'", () =>
        expect(
          calculator.getFee({
            userType: 0,
            itemType: 0,
            price: 10,
            endDate,
          })
        ).toBe(35));

      it("returns correct fee for 'auction' by 'company'", () =>
        expect(
          calculator.getFee({
            userType: 1,
            itemType: 0,
            price: 10,
            endDate,
          })
        ).toBe(30));

      it("returns correct fee for 'buy now ad' by 'company'", () =>
        expect(
          calculator.getFee({
            userType: 1,
            itemType: 1,
            price: 10,
            endDate,
          })
        ).toBe(40));

      it("returns correct fee for 'buy now ad' by 'person'", () =>
        expect(
          calculator.getFee({
            userType: 0,
            itemType: 1,
            price: 10,
            endDate,
          })
        ).toBe(45));
    });
  });
});
