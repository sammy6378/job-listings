import type { JobInterface } from "../types/jobTypes";
import jobs from "../../data.json";
import { useState } from "react";

function Jobs() {
  const [allJobs, setAllJobs] = useState<JobInterface[]>(jobs);
  const [filters, setFilters] = useState<string[]>([]);

  // filters
//   add filter
  function addFilter(filter: string) {
    if (filter && !filters.includes(filter)) {
      setFilters([...filters, filter]);
      setAllJobs(allJobs.filter((f) => f.languages.includes(filter)))
    }
  }

//   remove filter
function removeFilter(filter: string) {
  if (filter) {
    setFilters(filters.filter((f) => f !== filter));
    setAllJobs(jobs);
  }
}

function clearAllFilters(){
  setFilters([]);
  setAllJobs(jobs);
}

  const divStyle = {
    backgroundImage: "url('/bg-header-desktop.svg')",
    backgroundSize: "cover",
    height: "20vh",
  };

  return (
    <div className="bg-blue-50 h-screen">
      {/* header */}
      <div style={divStyle} className="bg-[#80CBC4] min-h-1/4 flex relative">
        <div className="absolute flex justify-between items-center left-24  -bottom-4 bg-white rounded-md p-4 w-9/12">
          <div className="flex space-x-3">
            {filters.length === 1 ? (
              <button className="flex space-x-2 bg-[#80cbc386] rounded-md text-[#26A69A] font-mono">
                <span className="ml-2">{filters[0]}</span>
                <span
                  onClick={() => removeFilter(filters[0])}
                  className="bg-[#26A69A] text-white px-2 rounded-md cursor-pointer"
                >
                  X
                </span>
              </button>
            ) : (
              filters.map((btn) => (
                <button className="flex space-x-2 bg-[#80cbc386] rounded-md text-[#26A69A] font-mono">
                  <span className="ml-2">{btn}</span>
                  <span
                    onClick={() => removeFilter(btn)}
                    className="bg-[#26A69A] text-white px-2 rounded-md cursor-pointer"
                  >
                    X
                  </span>
                </button>
              ))
            )}
          </div>
          <button 
          onClick={clearAllFilters}
          className="bg-red-200 rounded-md px-2 cursor-pointer">Clear</button>
        </div>
      </div>

      {/* main content */}
      <div className="p-4 mt-4">
        {allJobs.map((job) => (
          <div
            key={job.id}
            className="flex justify-between items-center mb-4 bg-white p-2 shadow-lg rounded-md border-l-4 border-blue-400"
          >
            <div className="flex space-x-6">
              <img src={job.logo} alt={job.company} />
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center space-x-3">
                  <span className="text-[#26A69A] font-bold">
                    {job.company}
                  </span>
                  <button className="bg-[#80CBC4] px-2 rounded-full cursor-pointer">
                    {job.new ? "NEW" : ""}
                  </button>
                  <button className="bg-[#212121] px-2 rounded-full text-white cursor-pointer">
                    {job.featured ? "FEATURED" : ""}
                  </button>
                </div>

                <div className="text-[#26A69A] font-semibold">
                  {job.position}
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>{job.postedAt}</span>.<span>{job.contract}</span>.
                  <span>{job.location ? job.location : ""}</span>
                </div>
              </div>
            </div>
            {/* filters */}
            <div>
              {job.languages.map((lang) => (
                <button
                  onClick={() => addFilter(lang)}
                  className="bg-slate-300 mr-3 rounded-md p-2 cursor-pointer hover:bg-[#80CBC4] "
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
