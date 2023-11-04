import styled from 'styled-components';
import {Send} from '@mui/icons-material';
import {mobile} from '../responsive';

const Container = styled.div`
    height: 60vh;
    background-color: #bbc1c5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Title = styled.h1`
    font-size: 60px;
    margin: 20px;
`
const Description = styled.div`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;
    ${mobile({textAlign : "center"})}
`
const InputContainer = styled.div`
    width: 50%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgrey;
    ${mobile({width : "80%"})}
`

const Input = styled.input`
    border: none;
    flex: 8;
    padding-left: 30px;
`
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: #1b3d5a;
    color: white;

    &:hover{
        background-color: aliceblue;
        
    }

`



const Newsletter = () => {
  return (
    <Container>

        <Title>Newsletter</Title>
        <Description>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis provident sed, consectetur quis et ratione rem optio iure nesciunt in.</Description>

        <InputContainer>
            <Input placeholder='Enter your email'/>
            <Button>
                <Send/>
            </Button>
        </InputContainer>

    </Container>
  );
}

export default Newsletter;
