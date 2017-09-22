<?php

namespace App\Traits;

trait ApiResponse
{
    protected $meta;
    protected $data;
    protected $paginate;
    protected $response;

    protected function setMeta($key, $value)
    {
        $this->meta[$key] = $value;
    }

    protected function setData($key, $value)
    {
        $this->data[$key] = $value;
    }

    protected function setPaginate($value)
    {
        $this->paginate = $value;
    }

    protected function setResponse()
    {
        $this->response['meta'] = $this->meta;
        if ($this->data !== null) {
            $this->response['data'] = $this->data;
        }
        if ($this->paginate !== null) {
            $this->response['pagination'] = $this->paginate;
        }
        $this->meta = array();
        $this->data = array();
        $this->paginate = array();
        return $this->response;
    }
}