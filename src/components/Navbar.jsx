import { Badge } from '@mui/base';
import { Search , ShoppingCart } from '@mui/icons-material';
import React, { useState } from 'react';
import styled from 'styled-components';
import {mobile} from '../responsive';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
    height: 85px;
    ${mobile({height : "50px"})}
`
const Wrapper = styled.div`
  padding: 20px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding : "10px 0px"})}

`
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display : "none"})}
`
const SearchContainer = styled.div`
  border:  0.5px solid lightgray;
  border-radius: 16px;
  height: 25px;
  padding: 5px;
  display: flex;
  align-items: center;
  margin-left: 25px;
`

const Input = styled.input`
  border: none;
  border-radius: 16px 0px 0px 16px;
  height: 25px;
  padding: 5px;
  ${mobile({width : "50px"})}
`

const Center = styled.div`
  flex: 1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
  color: #8093f1;
  ${mobile({fontSize : "27px"})}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({flex: 2, justifyContent : "center"})}
`

const MenuItem = styled.div`
  font-size: 15px;
  cursor: pointer;
  margin-left: 40px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
  position: relative; /* Add position:relative for the ::after pseudo-element */
  transition: border-bottom 0.3s ease; /* Add transition for smooth hover effect */

  /* Style the underline ::after pseudo-element */
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px; /* Set the thickness of the underline */
    background-color: #8093f1; /* Set the underline color */
    bottom: -8px;
    left: 0;
    transform: scaleX(0); /* Initially, the underline is hidden */
    transform-origin: center;
    transition: transform 0.4s ease; /* Add transition for the underline */
  }

  &:hover {
    /* Show the underline on hover */
    &::after {
      transform: scaleX(1); /* Scale the underline to full width on hover */
    }
  }


  ${props => props.noUnderline && `
    /* Remove underline on hover when noUnderline prop is true */
    &:hover {
      &::after {
        transform: scaleX(0);
      }
    }
  `}

`;


const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 20px;
  color: black;
`


const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      navigate(`/product/${searchValue}`);
    }
  };

  return (
    <Container>
      <Wrapper>

        <Left> 
          <Language> EN </Language>  
          <SearchContainer>
          <Input
              placeholder="Search"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Search
              style={{ color: 'gray', fontSize: 32, cursor: 'pointer' }}
              onClick={handleSearch}
            />
          </SearchContainer>
        </Left>


        <Center> <Logo> Digit X </Logo> </Center>


        <Right> 
          
          <MenuItem> <NavLink to='/'>Home </NavLink> </MenuItem>
          <MenuItem> <NavLink to="/products"> Products </NavLink>  </MenuItem>
          <MenuItem> <NavLink to="/register">Register</NavLink> </MenuItem>
          <MenuItem> <NavLink to='/login'>Log in </NavLink> </MenuItem>

          <MenuItem noUnderline={true}> 
            <Link to='/cart'>
                <Badge badgeContent={quantity} color="primary">
                      <ShoppingCart/>
                </Badge>
            </Link>
          </MenuItem>

        </Right>

      </Wrapper>
    </Container>
  );
}

export default Navbar;
