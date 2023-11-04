import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import { Add, Remove, Delete } from '@mui/icons-material';
import {mobile} from '../responsive';
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, increaseQuantity, decreaseQuantity } from "../redux/cartRedux"; 

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``
 
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({padding : "10px"})}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props=>props.type === 'filled' && 'none'};
    background-color: ${props=>props.type === 'filled' ? 'black' : 'transparent'};
    color: ${props=>props.type === 'filled' && 'white'};
`


const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({flexDirection : "column"})}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    ${mobile({flexDirection : "column"})}
`


const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
`

const ProductSize = styled.span``



const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 6px;
    ${mobile({margin : "20px 15px"})}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 300;
    ${mobile({marginBottom : "25px"})}
`


const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 2px;
    margin-top: 15px;
    margin-bottom: 15px;
`


const Summary = styled.div`
    flex: 1;
    border: 0.8px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 45vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;

`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === 'total' && '500'};
    font-size: ${props=>props.type === 'total' && '24px'};
`


const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 15px;
    background-color: lightgreen;
    font-weight: 600;
    border: none;
    cursor: pointer;
`


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useNavigate();
    const dispatch = useDispatch();
  
    const onToken = (token) => {
      setStripeToken(token);
    };
  
    useEffect(() => {
      const makeRequest = async () => {
        try {
          const res = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: 500,
          });
          history.push("/success", {
            stripeData: res.data,
            products: cart, });
        } catch {}
      };
      stripeToken && makeRequest();
    }, [stripeToken, cart, history]);


    const handleContinueShopping = () => {
      history('/products'); 
    };

    const handleDelete = (productId) => {
      dispatch(removeProduct(productId));

      alert('The Product has been successfully Removed from your cart !!');
    };

    const handleIncreaseQuantity = (productId) => {
      dispatch(increaseQuantity(productId));
    };
  
    const handleDecreaseQuantity = (productId) => {
      dispatch(decreaseQuantity(productId));
    };
    

    return (
      <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton onClick={handleContinueShopping}>CONTINUE SHOPPING</TopButton>
        
           
          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>

                    <Delete onClick={() => handleDelete(product._id)}/>

                    <ProductAmountContainer>
                      <Add onClick={() => handleIncreaseQuantity(product._id)} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove onClick={() => handleDecreaseQuantity(product._id)} />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout
                name="Digit X Shop"
                image="https://img.freepik.com/premium-photo/letter-d-uppercase-white-background-blue-chrome-3d-rendered-font-with-glossy-surface_154981-7074.jpg"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY} >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    );
  };

export default Cart;
