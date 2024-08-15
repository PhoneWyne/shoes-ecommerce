import { useState } from "react";
import axios from "axios";
import { API } from "../../constants/endpoints";


export function signIn({onClose}){
    const [isSignup , setIsSignup] = useState(false);
    const [formData , setFormData] = useState({
        email:"",
        password:"",
        confirmPassword: "",
        role:"user" //default role is user
    });
    const [error , setError] = useState("");
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    
}