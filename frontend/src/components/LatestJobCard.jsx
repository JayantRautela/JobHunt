import { Badge } from "./ui/badge";

const LatestJobCard = () => {
  return (
    <div className="border border-gray-300 rounded-lg p-5 shadow-xl bg-white cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa.</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>12 Position</Badge>
        <Badge className={'text-[#f83002] font-bold ml-2'} variant={'ghost'}>Part-Time</Badge>
        <Badge className={'text-[#7209b7] font-bold ml-2'} variant={'ghost'}>13 Lpa</Badge>
      </div>
    </div>
  )
}

export default LatestJobCard
