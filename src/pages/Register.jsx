import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from "react-router-dom";
import { register } from "../redux/apiCalls"; // Import the registration function
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1539376248633-cf94fa8b7bd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80") center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  b {
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #1e6091;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Log = styled(Link)`
  color: #1e6091;
  font-size: 15px;
  font-weight: bold;
  margin-left: 3px;
`



const Register = () => {
  const [firstName, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Check if passwords match before registration
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // File Upload Task
    uploadTask.on(
      "state_changed",
      (snapshot) => {

        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const user = { firstName, lastName, username, email, password , img: downloadURL };
            register(dispatch, user)
            .then(() => {
              // Product added successfully, show an alert
              window.alert("User Registered Successfully!");
            })
            .catch((error) => {
              // Handle any errors when adding the product
              console.error("Failled to Register User :", error);
            });
        });
      }
    );

   
  };

return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            type="text"
            value={firstName}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Agreement>
            By creating an account, I consent to the processing of my personal data in accordance with the <b>Privacy Policy.</b>
            <h4>Already have an Account?  <Log to={'/login'}> Login</Log></h4>
          </Agreement>
         
          <Button type="submit" disabled={isFetching}>
            {isFetching ? "Creating..." : "Create Account"}
          </Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
