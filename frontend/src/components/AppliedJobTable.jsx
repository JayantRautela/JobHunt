import { Table, TableCaption, TableHead, TableHeader, TableRow, TableBody, TableCell } from './ui/table';
import { Badge } from './ui/badge';

const AppliedJobTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            [1,2,3,4].map((item, index) => (
              <TableRow key={index}>
                <TableCell>17-07-2024</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell className="text-right"><Badge>Status</Badge></TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
