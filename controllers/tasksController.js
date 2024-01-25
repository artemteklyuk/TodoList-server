import {Task, List} from "../models/models.js"
import ApiError from "../error/ApiError.js";

class TasksController {
    async create(req, res) {
        try {
            let {text, listId} = req.body
            let userId = req.user.id
            const task = await Task.create(
                {
                    text: text,
                    UserId: userId,
                    ListId: listId
                })
            return res.json(task)
        } catch (e) {
            res.status(500).json({message: "Ошибка при созданиии задачи"})
        }
    }
    async getById(req, res) {
        const {listId} = req.query
        const tasks = await Task.findAll({
            where: {ListId: listId}
        })
        res.json(tasks)
    }
    async updateOne(req, res, next) {
        try {
            const {id, text, isComplete} = req.body
            if (!id) return next(ApiError.badRequest('Не был передан Id'))
            const exist = await Task.findOne({where: {id}})
            if (!exist) return next(ApiError.forbidden('Таска с таким Id не существует'))
            const updatedTask = await Task.update({text, isComplete}, {where: {id}})
            if (!updatedTask) return next(ApiError.internal('Что-то пошло не так!'))
            return res.json(updatedTask)
        } catch (e) {
            next(ApiError.internal(e))
        }
    }
    async delete(req, res) {
        const {id} = req.query
        await Task.destroy({
            where: {id}
        })
        res.json({message: "task was deleted"})
    }
}

export default new TasksController()