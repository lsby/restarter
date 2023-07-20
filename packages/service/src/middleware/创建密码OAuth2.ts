import jwt from "jsonwebtoken"
import { 创建不带路径的中间件 } from "../http/中间件"

function generateTokens(
  secret: string,
  time: string,
  userId: number,
): { access_token: string } {
  const access_token = jwt.sign({ userId }, secret, { expiresIn: time })
  return { access_token: access_token }
}

export var 创建密码OAuth2 = (secret: string, time: string = "7d") => {
  return {
    注入中间件: 创建不带路径的中间件(async (req, _res, next) => {
      if (req.headers.authorization == null) return next()

      const token = req.headers.authorization.replace("Bearer ", "")
      try {
        const decodedToken = jwt.verify(token, secret) as { userId: number }
        if (req.payload == null) req.payload = {}
        req.payload.userId = decodedToken.userId
        return next()
      } catch (error) {
        return next()
      }
    }),
    token生成器: (userId: number) =>
      generateTokens(secret, time, userId).access_token,
  }

  // 地址: string,
  // 验证函数: (username: string, pwd: string) => Promise<number>,
  // return [
  //   创建不带路径的中间件(async (req, _res, next) => {
  //     if (req.headers.authorization == null) return next()

  //     const token = req.headers.authorization.replace("Bearer ", "")
  //     try {
  //       const decodedToken = jwt.verify(token, secret) as { userId: number }
  //       if (req.payload == null) req.payload = {}
  //       req.payload.userId = decodedToken.userId
  //       return next()
  //     } catch (error) {
  //       return next()
  //     }
  //   }),
  //   创建带路径的中间件(地址, async (req, res) => {
  //     const { username, password } = req.body

  //     var userId
  //     try {
  //       userId = await 验证函数(username, password)
  //     } catch (e) {
  //       return res.status(401).json({ error: "Invalid credentials" })
  //     }

  //     const tokens = generateTokens(secret, time, userId)

  //     res.json(tokens)
  //   }),
  // ]
}
