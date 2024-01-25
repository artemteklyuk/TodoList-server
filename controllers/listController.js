import "../models/models.js"
import {List, User} from "../models/models.js";
import ApiError from "../error/ApiError.js";
import e from "express";

class ListController {
    async create(req, res) {
        try {
            let {title} = req.body
            let UserId = req.user.id
            const list = await List.create(
                {
                    title: title,
                    UserId: UserId
                })
            return res.json(list)
        } catch (e) {
            return e
        }
    }

    async getAll(req, res, next) {
        try {
            const {userId} = req.params

            if (!userId) return next(ApiError.badRequest('Не был передан UserId'))

            const tasks = await List.findAll({
                where: {UserId: userId},
                })

            if (!tasks) return next(ApiError.internal('Что-то пошло не так!'))

            return res.json(tasks)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }

    async getOne(req, res) {
        const id = req.params.id
        const list = await List.findOne({
            where: {id}
        })
        res.json(list)
    }

    async delete(req, res) {
        const {id} = req.query
        console.log(req)
        await List.destroy({
            where: {id}
        })
        res.json({message: "list was deleted"})
    }
}

export default new ListController()