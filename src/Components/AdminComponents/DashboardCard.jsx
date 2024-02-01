import React from 'react';
import { Bar } from 'react-chartjs-2';

const DashboardCard = ({ value }) => {
  // Sample data for the graph
  const graphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: `Monthly ${value}`,
        data: [12, 19, 3, 5, 2, 3, 10],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <a
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-5"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Total {value}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">8 {value}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          All {value} including blocked and unblocked
        </p>

        {/* Graph Section */}
        <div className="mt-4">
          <Bar data={graphData} />
        </div>
      </a>
    </div>
  );
};

export default DashboardCard;
