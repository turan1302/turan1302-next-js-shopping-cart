"use client";

import AppUrl from "@/RestAPI/AppUrl";
import RestClient from "@/RestAPI/RestClient";
import Notification from "@/RestAPI/Notification";
import { redirect } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

import parse from "html-react-parser";

const PaymentPage = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentForm, setPaymentForm] = useState("");

  const cart = useCart();

  const basketControl = () => {
    const { totalUniqueItems } = cart;

    if (totalUniqueItems === 0) {
      Notification.error({
        text: "Sepetinizde Ürün Yok !!!",
      });
      redirect("/");
    } else {
      getPaymentForm();
    }
  };

  const getPaymentForm = async () => {
    const { items, cartTotal } = cart;

    await RestClient.postRequest(AppUrl.payment, {
      basket: items,
      totalPrice: cartTotal,
    })
      .then((res) => {
        const status = res.status;
        const result = res.data;


        if (status === 200) {
          setIsLoading(false);
          setPaymentForm(result.view);
        } else {
          Notification.error(result);
          redirect("/");
        }
      })
      .catch((err) => {
        console.log(err);
        Notification.error({
          text: "Bir hata oluştu. Lütfen Daha Sonra Tekrar Deneyiniz",
        });
      });
  };

  useEffect(() => {
    basketControl();
  },[]);

  return (
    <>
      {paymentForm !== "" ? (
        parse(paymentForm)
      ) : (
        <div
          className={
            "d-flex justify-content-center align-content-center vh-100"
          }
        >
          Ödeme formu getiriliemedi
        </div>
      )}
    </>
  );
};

export default PaymentPage;
