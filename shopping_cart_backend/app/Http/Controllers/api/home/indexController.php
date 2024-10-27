<?php

namespace App\Http\Controllers\api\home;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\ProductModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $products = ProductModel::orderBy("prd_id","asc")->get();

        return parent::success("Ürünler Getirildi",$products);
    }
}
