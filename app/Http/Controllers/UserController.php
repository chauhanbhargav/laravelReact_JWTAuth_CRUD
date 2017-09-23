<?php

namespace App\Http\Controllers;

use App\Traits\ApiResponse;
use App\UserModel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

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

    public function login(Request $request)
    {
        try {
            $credentials = $request->only('email', 'password');
            if (!$token = JWTAuth::attempt($credentials)) {
                $this->setMeta('status', 'fail');
                $this->setMeta('message', 'Invalid Login details');
                return response()->json($this->setResponse());
            }
        } catch (JWTException $e) {
            $this->setMeta('status', 'fail');
            $this->setMeta('message', 'Server Error. Retry.');
            return response()->json($this->setResponse());
        }
        $this->setMeta('status', 'ok');
        $this->setMeta('message', 'Logged in successfully.');
        $user = JWTAuth::toUser($token)->makeHidden(['created_at', 'updated_at', 'id']);
        $this->setData('token', $token);
        $this->setData('user', $user);
        return response()->json($this->setResponse());
    }
}
