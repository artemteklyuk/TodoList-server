import "../models/models.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import {User} from "../models/models.js";
import ApiError from "../error/ApiError.js";

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    )
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email || !password) return next(ApiError.badRequest('Некорректный email или пароль'))

            const candidate = await User.findOne({where: {email}})

            if (candidate) return next(ApiError.badRequest('Пользователь с таким e-mail существует'))

            const hashPassword = await bcrypt.hash(password, 5)

            const user = await User.create({email, password: hashPassword})

            if (!user) return next(ApiError.internal("Непредвиденная ошибка!"))

            const token = generateJwt(user.id, user.email)

            if (!token) return next(ApiError.internal('Что-то не так с токеном!'))

            return res.json({token})
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            if (!email || !password) return next(ApiError.badRequest('Некорректный email или пароль'))

            const user = await User.findOne({where: {email}})

            if (!user) return next(ApiError.internal('Пользователя не существует!'))

            let comparePassword = bcrypt.compareSync(password, user.password)

            if (!comparePassword) return next(ApiError.internal('Указан неверный пароль!'))

            const token = generateJwt(user.id, user.email)

            if (!token) return next(ApiError.internal("Что-то не так с токеном!"))

            return res.json({token})
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email)

            if (!token) return next(ApiError.internal("Что-то не так с токеном!"))

            return res.json({token})
        } catch (e) {
            next(ApiError.internal(e))
        }
    }
}
export default new UserController()