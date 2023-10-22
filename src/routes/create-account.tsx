import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components"
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper =styled.div`
    height: 100%;
    display: flex;
    flex-direction : column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column ;
    gap:10px;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit" ]{
        &:hover{
            opacity: 0.8;
        } 
    }


`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

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
            //
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
        </Wrapper>
    );
}