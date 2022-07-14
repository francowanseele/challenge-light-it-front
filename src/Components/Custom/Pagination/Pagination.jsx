import React from "react";
import clsx from "clsx";
import styles from "./Pagination.module.scss";
import "./Pagination.module.scss";
export default function Pagination(props) {
  const { page, setPage, maxPages } = props;
  let items = [];
  let leftSide = page - 2;
  if (leftSide <= 0) leftSide = 1;
  let rightSide = page + 2;
  if (rightSide > maxPages) rightSide = maxPages;
  for (let number = leftSide; number <= rightSide; number++) {
    items.push(
      <button
        className={` hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${
          number === page ? "bg-gray-400" : "bg-gray-300"
        }`}
        key={number}
        onClick={() => setPage(number)}
      >
        {number}
      </button>
    );
  }
  const nextPage = () => {
    if (page < maxPages) {
      setPage(page + 1);
    }
  };
  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div className={clsx([styles.flexContainer])}>
      <div className={clsx([styles.paginateCtn])}>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          onClick={prevPage}
        >
          Prev
        </button>
        {items}
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
