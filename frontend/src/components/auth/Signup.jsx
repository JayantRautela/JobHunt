import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from 'axios';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const navigate = useNavigate();
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }

  const changeFileHandler = (e) => {
    setInput({...input, file: e.target.files?.[0]});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        header: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/login');
        toast.success(response.data.success);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input 
              type="text" 
              placeholder="jayant" 
              value={input.fullname} 
              name='fullname'
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input 
              type="email" 
              placeholder="jayant@gmail.com" 
              value={input.email} 
              name='email'
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input 
              type="tel" 
              placeholder="8888899999" 
              value={input.phoneNumber} 
              name='phoneNumber'
              onChange={changeEventHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input 
              type="password"  
              value={input.password} 
              name='password'
              onChange={changeEventHandler}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="Student"
                  checked={input.role === 'Student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                  type="radio"
                  name="role"
                  value="Recruiter"
                  checked={input.role === 'Recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading ? (<Button className='w-full my-4'><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait</Button>) : <Button type="submit" className='w-full my-4'>Login</Button>
          }
          <span className="text-sm">Already Have an Account? <Link to="/login">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
