import styled from 'styled-components';
import {mobile} from '../responsive';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: url("https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80")center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center; 
`

const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    ${mobile({width : "75%"})}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 500;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`


const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin-top: 15px;
    margin-bottom: 10px;
    background-color: #1e6091;
    color: white;
    cursor: pointer;
`

const Links = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;  
`

const Direct = styled(Link)`
  font-size: 14px;
`

const Error = styled.span`
  color: red;
`;


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);
  
    //Access the navigate object
    const navigate = useNavigate();

    const handleClick = (e) => {
      e.preventDefault();
      login(dispatch, { username, password })
      .then(() => {
          alert('Login Successfull !!');
          navigate("/");
      })
      .catch((error) => {
          console.error("Failled to Login !!:", error);
      });
      
    };


  return (
    <Container>
      <Wrapper>
            <Title>LOGIN</Title>
            <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Direct to={'/register'}>CREATE A NEW ACCOUNT</Direct>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
