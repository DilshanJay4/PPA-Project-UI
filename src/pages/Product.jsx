import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { Add, Remove } from '@mui/icons-material';
import {mobile} from '../responsive';
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding: "10px",flexDirection : "column"})}
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 80vh;
    object-fit: cover;
    ${mobile({height: "40vh"})}
`

 
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({padding : "10px"})}
`

const Title = styled.h1`
    font-weight: 300;
`


const Desc = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({width : "100%"})}
`


const Filter = styled.div`
    display: flex;
    align-items: center;
`


const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200; 
`


const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0px 5px;
    cursor: pointer; 
`


const FilterSize = styled.select`
    margin-left: 10px;
    padding: 6px;
    border-radius: 7px;
`

const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between ;
    ${mobile({width : "100%"})}
`

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 3px solid lightblue;
    background-color: #ccdbfd;
    cursor: pointer;
    border-radius: 10px;
    font-weight: 500;
    transition: all 0.5s ease;

    &:hover{
        background-color: #b6ccfe;
    }

`


const Product = () => {
    const { title } = useParams();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    // const title = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
  

  
    
    const decodedTitle = decodeURIComponent(title);

    useEffect(() => {
      const getProduct = async () => {
        try {
          if (id) {
            // Fetch by ID
            const res = await publicRequest.get(`/products/find/${id}`);
            setProduct(res.data);
          } else if (decodedTitle) {
            // Fetch by title
            const res = await publicRequest.get(`/products/find-by-title/${decodedTitle}`);
            setProduct(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      getProduct();
    }, [id, decodedTitle]);

  

    const handleQuantity = (type) => {
      if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    };
  
    const handleClick = () => {
      dispatch(
        addProduct({ ...product, quantity, color, size })
      );
    };
    return (
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <ImgContainer>
            <Image src={product.img} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {product.color?.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <Remove onClick={() => handleQuantity("dec")} />
                <Amount>{quantity}</Amount>
                <Add onClick={() => handleQuantity("inc")} />
              </AmountContainer>
              <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    );
  };

export default Product;







// useEffect(() => {
//   const getProduct = async () => {
//     try {
//       const res = await publicRequest.get("/products/find/" + id);
//       setProduct(res.data);
//     } catch {}
//   };
//   getProduct();
// }, [id]);



// useEffect(() => {
//   const getProduct = async () => {
//     try {
//       const res = await publicRequest.get(`/products/find/${title}`);
//       setProduct(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   getProduct();
// }, [title]);