import { Badge } from "./ui/badge";
import PropTypes from 'prop-types';

const LatestJobCard = ({ job }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-5 shadow-xl bg-white cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>{job?.position}</Badge>
        <Badge className={'text-[#f83002] font-bold ml-2'} variant={'ghost'}>{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold ml-2'} variant={'ghost'}>{job?.salary} Lpa</Badge>
      </div>
    </div>
  )
}
LatestJobCard.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.number,
  }).isRequired,
};

export default LatestJobCard;
