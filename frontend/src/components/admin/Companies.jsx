import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./ComapniesTable";

const Companies = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input
            className='w-fit'
            placeholder='FIlter by name'
          />
          <Button>New Company</Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  )
}

export default Companies
