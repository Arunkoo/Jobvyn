"use Clinet";
import { useAppData } from "@/context/AppContext";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const Companies = () => {
  const { loading } = useAppData();
  const addRef = useRef<HTMLButtonElement | null>(null);
  const openDialog = () => {
    addRef.current?.click();
  };
  const [name, setName] = useState("");
  const [description, setDiscription] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [companies, setCompanies] = useState([]);

  const clearData = () => {
    setName("");
    setDiscription("");
    setWebsite("");
    setLogo(null);
  };

  const token = Cookies.get("token");

  //   fetch companies.....
  async function fetchCompanies() {
    try {
      const { data } = await axios.get();
    } catch (error) {}
  }
  return <div>Company</div>;
};

export default Companies;
