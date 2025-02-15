import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJob = [1, 2, 3];

const BrowseJobs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 ">
        <h1 className="font-bold text-xl my-10">Search Result ({randomJob.length})</h1>
        <div className="grid grid-cols-3 gap-4">
          {
            randomJob.map((item, index) => {
              return <Job key={index} />;
            })
          }
        </div>
      </div>
    </div>
  );
};

export default BrowseJobs;
