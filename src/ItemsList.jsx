import moment from "moment";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { itemTypeOptions, userTypeOptions } from "./ItemForm";

const ItemsList = ({ items }) => {
  const isToday = useCallback(
    (date) => moment(date).isSame(moment(), "day"),
    []
  );

  return (
    <>
      <h3>Items</h3>
      <div className="d-flex flex-wrap" style={{ gap: 10 }}>
        {items.map((ad, i) => (
          <div
            className="card"
            style={{ minWidth: "11rem" }}
            data-testid={`ad-card-${i}`}
            key={i}
          >
            <div className="card-body">
              <h5 className="card-title">
                {`${itemTypeOptions[ad.itemType].label} `}
              </h5>
              <h6 className="card-subtitle text-muted">{`by a ${
                userTypeOptions[ad.userType].label
              }`}</h6>
              <p className="card-text mt-3">
                Item price:&nbsp;
                <span className="badge badge-info">${ad.price}</span>
              </p>
            </div>
            <div className="card-footer">
              {isToday(ad.endDate) ? (
                <small className="text-danger font-weight-bold">
                  Ends today!
                </small>
              ) : (
                //TODO localize date
                <small className="text-muted text-nowrap">
                  Ends on: {ad.endDate}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      userType: PropTypes.number.isRequired,
      itemType: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      endDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ItemsList;
