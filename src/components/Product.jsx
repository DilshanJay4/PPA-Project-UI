import styled from 'styled-components';
import {Visibility, FavoriteBorder, ShoppingCart } from '@mui/icons-material';
import { Link } from "react-router-dom";

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    border-radius: 11px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.6s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin: 10px;
    min-width: 280px;
    height: 380px;
    border-radius: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6f6;
    position: relative;
    
    &:hover ${Info}{
        opacity: 1;
    }

`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;

`
const Image = styled.img`
    height: 75%;
    z-index: 2 ;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px;
    transition: all 0.4s ease;

    &:hover{
        background-color: aliceblue;
        transform: scale(1.2);
    }

`





const Product = ({item}) => {
  return (
    <Container>
      
        <Circle/>
        <Image src = {item.img}/>
        <Info>
            <Icon>
                 <Link to={'/cart'}> <ShoppingCart/> </Link>
            </Icon>
            <Icon>
                 <Link to={`/product/${item._id}`}><Visibility/></Link>
            </Icon>
            <Icon>
                <FavoriteBorder/>
            </Icon>
        </Info>

    </Container>
  );
}

export default Product;


// position: relative;
// transition: all 0.2s;

// &:hover {
//       content: '';
//       height: 2px;
//       width: 100%;
//       background-color: greenyellow;
//       position: absolute;
//       bottom: 0;
//       left: 0;
//   }