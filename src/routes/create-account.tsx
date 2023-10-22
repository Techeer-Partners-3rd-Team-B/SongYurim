import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";



export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [error, SetError] = useState("");


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {
            target:{name, value},
        } = e

        if(name ==="name"){
            SetName(value);
        } else if(name==="email"){
            SetEmail(value);
        } else if(name==="password"){
            SetPassword(value);
        }
    }

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        if(isLoading|| name==="" || email ==="" || password==="") return;
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password)
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/");
        } catch (e) {
            if(e instanceof FirebaseError){
                SetError(e.message)
            }
        } finally {
            setLoading(false);
        }
        console.log(name, email, password)
    }

    return (
        <Wrapper>
            <Title>Join X</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                    onChange={onChange} 
                    name = "name" 
                    value = {name} 
                    placeholder="Name" 
                    type="text" 
                    required
                />
                <Input onChange={onChange} name="email" value = {email} placeholder="Email" type="text" required/>
                <Input onChange={onChange}  name = "password" value = {password} placeholder="Password" type="password" required/>
                <Input type="submit" value={isLoading? "Loading..." : "Create Account"}/>
            </Form>
            {error !== ""? <Error>{error}</Error>: null}
            <Switcher>
                Already have an account?{" "}
                <Link to="/login">Log in &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}