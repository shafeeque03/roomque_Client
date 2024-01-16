import React from 'react'

const DashboardCard = ({value}) => {
  return (
    <div>
        
<a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-5">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total {value}</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">8 {value}</p>
<p class="font-normal text-gray-700 dark:text-gray-400">All {value} including blocked and unblocked</p>
</a>

    </div>
  )
}

export default DashboardCard