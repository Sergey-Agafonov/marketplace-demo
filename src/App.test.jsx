import { act, render, screen } from "@testing-library/react";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import App from "./App";

let onItemAddedSpy;

describe("App Component", () => {
  beforeAll(() => {
    vi.mock("./ItemForm", () => ({
      default: ({ onItemAdded }) => (
        (onItemAddedSpy = onItemAdded), (<div>Ad Form</div>)
      ),
    }));

    vi.mock("./ItemsList", () => ({
      default: () => <div>Ads List</div>,
    }));
    // TODO mock out Calculator as well
  });

  beforeEach(() => render(<App />));

  it("renders ad form", () =>
    expect(screen.getByText("Ad Form")).toBeInTheDocument());

  it("does not render ads list without ads", () =>
    expect(screen.queryByText("Ads List")).not.toBeInTheDocument());

  it("does not render total fees without ads", () =>
    expect(screen.queryByText("Total fees")).not.toBeInTheDocument());

  describe("when ads added", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 8, 8));

      act(() => {
        onItemAddedSpy({
          price: 100,
          endDate: "2024-09-08",
          userType: 0,
          itemType: 0,
        });
        onItemAddedSpy({
          price: 101,
          endDate: "2024-09-24",
          userType: 0,
          itemType: 1,
        });
        onItemAddedSpy({
          price: 102,
          endDate: "2024-09-27",
          userType: 1,
          itemType: 0,
        });
        onItemAddedSpy({
          price: 103,
          endDate: "2024-09-08",
          userType: 1,
          itemType: 1,
        });
      });
    });

    afterEach(() => vi.useRealTimers());

    it("renders total fees for added ads", () =>
      expect(screen.getByText("Total fees: 506")).toBeInTheDocument());
  });
});
