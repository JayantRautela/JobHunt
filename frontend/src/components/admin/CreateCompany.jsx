import Navbar from "../shared/Navbar";
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setSingleCompany } from "../../redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

  const registerCompany = async () => {
    try {
      const response = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    });
    if(response?.data?.success){
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        const companyId = response?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
    }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>Cancel</Button>
          <Button onCLick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
