import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ItemsList from "./ItemsList";

describe("ItemsList Component", () => {
  let items;

  beforeEach(() => {
    items = [
      { price: 100, endDate: "2024-09-08", userType: 0, itemType: 0 },
      { price: 101, endDate: "2024-09-24", userType: 0, itemType: 1 },
      { price: 102, endDate: "2024-09-27", userType: 1, itemType: 0 },
      { price: 103, endDate: "2024-09-08", userType: 1, itemType: 1 },
    ];
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 8, 8));

    render(<ItemsList items={items} />);
  });

  afterEach(() => vi.useRealTimers());

  it("renders all ads", () =>
    expect(screen.getAllByTestId(/^ad-card-/)).toHaveLength(4));

  it("renders ads ending today", () =>
    expect(screen.getAllByText("Ends today!")).toHaveLength(2)); // TODO make sure tests run in EN locale after labels/dates i18n-ed

  it("renders ads ending in future", () => {
    expect(screen.getAllByText("Ends on: 2024-09-24")).toHaveLength(1);
    expect(screen.getAllByText("Ends on: 2024-09-27")).toHaveLength(1);
  });

  it("renders Auction ad by a Person for 100", () => {
    const ad = screen.getByTestId("ad-card-0");
    expect(ad).toHaveTextContent("Auction");
    expect(ad).toHaveTextContent("by a Person");
    expect(ad).toHaveTextContent("Item price: $100");
  });

  it("renders Buy now ad by a Person for 101", () => {
    const ad = screen.getByTestId("ad-card-1");
    expect(ad).toHaveTextContent("Buy it now");
    expect(ad).toHaveTextContent("by a Person");
    expect(ad).toHaveTextContent("Item price: $101");
  });

  it("renders Auction ad by a Company for 102", () => {
    const ad = screen.getByTestId("ad-card-2");
    expect(ad).toHaveTextContent("Auction");
    expect(ad).toHaveTextContent("by a Company");
    expect(ad).toHaveTextContent("Item price: $102");
  });

  it("renders Buy now ad by a Company for 103", () => {
    const ad = screen.getByTestId("ad-card-3");
    expect(ad).toHaveTextContent("Buy it now");
    expect(ad).toHaveTextContent("by a Company");
    expect(ad).toHaveTextContent("Item price: $103");
  });
});
