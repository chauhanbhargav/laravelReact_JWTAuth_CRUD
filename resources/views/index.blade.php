<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" type="image/png" href="{{asset('images/react.png')}}"/>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel React</title>
    <link href="{{asset('css/app.css')}}" rel="stylesheet" type="text/css">
</head>
<body>
<div id="app"></div>
<script src="{{asset('js/app.js')}}"></script>
</body>
</html>