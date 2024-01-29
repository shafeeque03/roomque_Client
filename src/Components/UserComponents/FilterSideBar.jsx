import { useEffect, useState } from "react";

const FilterSideBar = ({ setCars, filterCars, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    modelType: { Premium: false, Medium: false, Normal: false },
    fuelType: { Diesel: false, Petrol: false, Electric: false },
    transitionType: { Automatic: false, Manual: false },
  });

  useEffect(() => {
    const filteredCars = filterCars.filter((car) => {
      const { modelType, fuelType, transitionType } = filterOptions;
      const selectedModelTypes = Object.keys(modelType).filter(
        (type) => modelType[type]
      );
      const selectedFuelTypes = Object.keys(fuelType).filter(
        (type) => fuelType[type]
      );
      const selectedTransitionTypes = Object.keys(transitionType).filter(
        (type) => transitionType[type]
      );

      // Check if the car matches all selected options across categories
      const modelMatch =
        selectedModelTypes.length === 0 ||
        selectedModelTypes.includes(car.modelType);
      const fuelMatch =
        selectedFuelTypes.length === 0 ||
        selectedFuelTypes.includes(car.fuelType);
      const transitionMatch =
        selectedTransitionTypes.length === 0 ||
        selectedTransitionTypes.includes(car.transitionType);
      return modelMatch && fuelMatch && transitionMatch;
    });
    setCars(filteredCars);
  }, [filterOptions, filterCars]);

  const handleCheckboxChange = (option, type) => {
    
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [type]: {
        ...prevOptions[type],
        [option]: !prevOptions[type][option],
      },
    }));
    
  };
  const handleSearch = () => {
    const filtered = filterCars.filter((car) =>
      car.carName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCars(filtered);
    setCurrentPage(1);
  };
  const resetFilter = () => {
    setFilterOptions({
      modelType: { Premium: false, Medium: false, Normal: false },
      fuelType: { Diesel: false, Petrol: false, Electric: false },
      transitionType: { Automatic: false, Manual: false },
    });
    setSearchTerm("");
    setCars(filterCars);
    setCurrentPage(1);
  };
  return (
    <>
      <div className="relative mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Cars"
          required=""
        />
        <button
          onClick={handleSearch}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold my-2 uppercase">Filter</h1>
        <button onClick={resetFilter}>Clear Filter</button>
      </div>
      <div className="grid gap-2 my-5">
        <h1 className="px-4 py-2  bg-blue-500 font-bold text-white rounded-md">
          Model Type
        </h1>
        {Object.keys(filterOptions.modelType).map((option) => (
          <div
            key={option}
            className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 hover:bg-gray-300"
          >
            <input
              type="checkbox"
              checked={filterOptions.modelType[option]}
              onChange={() => handleCheckboxChange(option, "modelType")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="grid gap-2  my-5">
        <h5 className="px-4 py-2  bg-blue-500 font-bold text-white rounded-md">
          Fuel Type
        </h5>
        {Object.keys(filterOptions.fuelType).map((option) => (
          <div
            key={option}
            className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              type="checkbox"
              checked={filterOptions.fuelType[option]}
              onChange={() => handleCheckboxChange(option, "fuelType")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="grid gap-2  my-5">
        <h5 className="px-4 py-2  bg-blue-500 font-bold text-white rounded-md">
          Transition Type
        </h5>
        {Object.keys(filterOptions.transitionType).map((option) => (
          <div
            key={option}
            className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              type="checkbox"
              checked={filterOptions.transitionType[option]}
              onChange={() => handleCheckboxChange(option, "transitionType")}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {option}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterSideBar;
