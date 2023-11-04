import styled from 'styled-components';
import {Facebook,Instagram,Twitter,Room,Phone,Email} from '@mui/icons-material';
import {mobile} from '../responsive';

const Container = styled.div`
    display: flex;
    background-color: #212529;
    color: #adb5bd;
    ${mobile({flexDirection : "column"})}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

 
const Logo = styled.h1` 
    color: #e9ecef;
`

const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
`


const SocialIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 12px;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
`



const Center = styled.div`
    flex: 1;
    padding: 25px;
    ${mobile({display : "none"})}
`

const Title = styled.h3`
    margin-bottom: 25px;
    color: #f8f9fa;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px; 
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
`

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`



const Footer = () => {
  return (
    <Container>

      <Left>
        <Logo>digitX</Logo>
        <Desc>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur ea unde cum error esse vel quisquam numquam explicabo rem dignissimos!</Desc>
        <SocialContainer>
            <SocialIcon color = "3B5999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color = "E4405F">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color = "55ACEE">
                <Twitter/>
            </SocialIcon>
        </SocialContainer>
      </Left>


      <Center>
        <Title>Useful Links</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>WishList</ListItem>
            <ListItem>Terms & Conditions</ListItem>
        
        </List>
      </Center>


      <Right>
        <Title></Title>

        <ContactItem><Room style={{marginRight: "10px"}}/>Address 199 Your Road.</ContactItem>
        <ContactItem><Phone style={{marginRight: "10px"}}/>+94 76 277 8062</ContactItem>
        <ContactItem><Email style={{marginRight: "10px"}}/>Contact : klakahan@gmail.com</ContactItem>

      </Right>
    
    </Container>
  );
}

export default Footer;





/* <SocialIcon>
    <WhatsApp/>
</SocialIcon> */