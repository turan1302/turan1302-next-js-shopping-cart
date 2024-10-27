"use client"

import { useCart } from "react-use-cart";

import React, { useEffect, useState } from "react";
import Notification from "@/RestAPI/Notification";
import RestClient from "@/RestAPI/RestClient";
import AppUrl from "@/RestAPI/AppUrl";

import { Container,Row,Col,Card,Button } from "react-bootstrap";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { addItem } = useCart();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    await RestClient.getRequest(AppUrl.home)
      .then((res) => {
        const result = res.data;
        const status = res.status;

        if (status === 200) {
          setIsLoading(false);
          setProducts(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
        Notification.error({
          text: "Bir Hata Oluştu Lütfen Daha Sonra Tekrar Deneyiniz",
        });
      });
  };

  const addQuantity = (id, value) => {
    let newProducts = products.map((item, index) => {
      return item.prd_id === id
        ? { ...item, addQuantity: parseInt(value) }
        : item;
    });

    setProducts(newProducts);
  };

  const addCart = (id) => {
    let newProducts = products.map((item, index) => {
      if (item.prd_id === id) {
        addItem(
          {
            id: item.prd_id,
            name: item.prd_name,
            price: item.prd_price,
          },
          item.addQuantity
        );

        delete item.addQuantity;
      }

      return item;
    });

    setProducts(newProducts);
  };

  const productRender = (products) => {
    return products.map((item, index) => {
      return (
        <Col key={index} md={4} className={"mt-5"}>
          <Card>
            <Card.Body>
              <Card.Title>{item.prd_name}</Card.Title>
              <Card.Text>Fiyat: {item.prd_price} ₺</Card.Text>
              <input
                className={"form-control"}
                value={item.addQuantity ? item.addQuantity : ""}
                onChange={(event) =>
                  addQuantity(item.prd_id, event.target.value)
                }
                type={"number"}
              />
              <Button
                className={"mt-3"}
                onClick={() => addCart(item.prd_id)}
                variant="success"
              >
                Sepete Ekle
              </Button>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };


  return (
    <>
      <Container className={"mt-5"}>
        <h3 className={"d-flex justify-content-center align-self-center"}>
          - Ürün Listesi -
        </h3>
        <Row className={"mt-5"}>
          {products.length === 0 ? (
            <div className={"col-md-12 alert alert-danger text-center"}>
              Herhangi bir ürün bulunamadı
            </div>
          ) : (
            productRender(products)
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
