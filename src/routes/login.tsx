import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/gitjub-btn";


export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [error, SetError] = useState("");


    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {
            target:{name, value},
        } = e

        if(name==="email"){
            SetEmail(value);
        } else if(name==="password"){
            SetPassword(value);
        }
    }

    const onSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault;
        if(isLoading || email ==="" || password==="") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
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
            <Title>Login X</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value = {email} placeholder="Email" type="text" required/>
                <Input onChange={onChange}  name = "password" value = {password} placeholder="Password" type="password" required/>
                <Input type="submit" value={isLoading? "Loading..." : "Log in"}/>
            </Form>
            {error !== ""? <Error>{error}</Error>: null}
            <Switcher>
                Don't have an account?{" "}
                <Link to="/create-account">Create one &rarr;</Link>
            </Switcher>
            <GithubButton/>
        </Wrapper>
    );
}