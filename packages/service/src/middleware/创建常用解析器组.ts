import cookieParser from "cookie-parser"
import express from "express"
import { 创建不带路径的中间件 } from "../http/中间件"

export var 创建常用解析器组 = () => [
  创建不带路径的中间件(express.json()),
  创建不带路径的中间件(express.urlencoded({ extended: true })),
  创建不带路径的中间件(cookieParser()),
]
