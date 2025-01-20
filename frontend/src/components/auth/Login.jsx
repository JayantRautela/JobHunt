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

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        header: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (response.data.success) {
        navigate('/');
        toast.success(response.data.success);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>
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
          </div>
          <Button tpye="submit" className='w-full my-4'>Login</Button>
          <span className="text-sm">Don&apos;t Have an Account? <Link to="/signup">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;
