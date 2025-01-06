import React from "react";
import { Link } from "react-router-dom";
import { FaInfo } from "react-icons/fa";
import AddButton from "../../common/AddButton";

export default function StoreCard({ ...props }) {
  const { thumbnail, title, description, id  } = props;
  return (
    <div className="max-w-sm mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <span>
        <img className="rounded-t-lg" src={thumbnail} alt="" />
      </span>
      <div className="p-5">
        <span>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </span>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <AddButton product={props} />
          <Link
            to={`${id}`}
            data-testid="link-element"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-indigo-600 hover:bg-indigo-500"
          >
            More Info
            <FaInfo className="ml-3" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
