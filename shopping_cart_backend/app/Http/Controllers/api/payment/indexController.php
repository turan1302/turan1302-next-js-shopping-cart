<?php

namespace App\Http\Controllers\api\payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

const KDV = 20;
class indexController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->except("_token");

        if (!empty($data['basket'])){
            $basketData=[];

            foreach ($data['basket'] as $basket){
                $basketData[]=[
                    [$basket['name'],$basket['price'],$basket['quantity']]
                ];
            }

            $totalPrice = $data['totalPrice']*((100+KDV)/100);


            $viewData = [
                "basketData" => $basketData,
                "totalPrice"=>$totalPrice
            ];

            $view = view('payment.index',$viewData)->render();

            return response()->json([
                "success" => true,
                "text" => "Ödeme Formu Getirildi",
                "view" => $view
            ],200);
        }else{
            return response()->json([
                "success" => false,
                "text" => "Sepetiniz Boş",
            ],404);
        }
    }
}
