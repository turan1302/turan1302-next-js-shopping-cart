"use client"

import cartWrapper from "@/cartWrapper";
import Link from "next/link";
import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { useCart } from "react-use-cart";

const BasketPage = (props) => {
  const { totalUniqueItems, updateItemQuantity, removeItem, cartTotal, items } = useCart();
  const KDV = 20;

  const cartRender = (items) => {
    return items.map((item) => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>{item.price} ₺</td>
        <td>{item.quantity * item.price} ₺</td>
        <td>
          <Button
            variant="success"
            className="mx-2"
            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            1 Artır
          </Button>
          <Button
            variant="danger"
            className="mx-2"
            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
          >
            1 Azalt
          </Button>
        </td>
        <td>
          <Button
            variant="danger"
            className="mx-2"
            onClick={() => removeItem(item.id)}
          >
            Kaldır
          </Button>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <Container className="mt-5">
        <h3 className="mt-5 d-flex justify-content-center">- Sepetim -</h3>
        <Row className="mt-5">
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Ürün Adı</th>
                  <th>Ürün Adet</th>
                  <th>Ürün Fiyat</th>
                  <th>Ürün Toplam Fiyat</th>
                  <th>Adet İşlem</th>
                  <th>Silme İşlem</th>
                </tr>
              </thead>
              <tbody>
                {totalUniqueItems === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="alert alert-danger text-center">
                        <p>Herhangi bir ürün bulunamadı</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  cartRender(items)
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      {totalUniqueItems !== 0 && (
        <Container className="mt-5">
          <Row className="mt-5">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Text>
                    Ara Toplam:{" "}
                    <Badge className="text-white p-2 ml-1 bg-success">
                      {cartTotal} ₺
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Text>
                    KDV:{" "}
                    <Badge className="text-white p-2 ml-1 bg-danger">
                      {KDV} %
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Text>
                    Toplam Fiyat:{" "}
                    <Badge className="text-white p-2 ml-1 bg-success">
                      {(cartTotal * ((100 + KDV) / 100)).toFixed(2)} ₺
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button as={Link} href="/payment" variant="success" className="mt-3">
            Ödeme Yap
          </Button>
        </Container>
      )}
    </>
  );
};

export default BasketPage;
