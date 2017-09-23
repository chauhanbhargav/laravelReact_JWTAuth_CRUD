<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\UserModel;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use ApiResponse;

    public function signup(Request $request)
    {
        $user = new UserModel();
        $user->name = $request->userName;
        $user->email = $request->emailId;
        $user->password = bcrypt($request->password);
        $user->save();
        $this->setMeta('status', 'ok');
        $this->setMeta('message', 'Successfully Registered');
        return response()->json($this->setResponse());
    }

}
