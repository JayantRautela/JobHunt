import { Contact, Mail, Pen } from 'lucide-react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import { useState } from 'react';
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);
  const isResume = user.profile.resume;
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className='flex justify-between'>
        <div className='flex items-center gap-4 '>
          <Avatar className="h-24 w-24">
            <AvatarImage src="" alt="user profile photo"></AvatarImage>
          </Avatar>
          <div>
            <h1 className='font-medium text-xl'>{user.fullname}</h1>
            <p>{user.bio}</p>
          </div>
        </div>
        <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>
        </div>
        <div>
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {
              user.profile?.skills.length !== 0 ? user.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {
            isResume ? <a target='_blank' className='text-blue-500 w-full hover:underline cursor-pointer' href={user?.profile?.resume}>{user.profile?.resumeOriginalname}</a> : <span>Resume Not Available</span>
          }
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>All Applied Job</h1>
        <AppliedJobTable/>
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </>
  )
}

export default Profile
