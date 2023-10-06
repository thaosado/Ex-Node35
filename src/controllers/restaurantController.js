import sequelize from '../models/connect.js'
import initModels from '../models/init-models.js';

let model = initModels(sequelize);

//xử lý like nhà hàng(like, unlike);

const likeRes = async (req, res) => {
    let { userId } = req.params;
    let { resId, id } = req.body;

    //kiểm tra người dùng đã like nhà hàng chưa
    let checkLike = await model.like_res.findAll({
        where: {
            user_id: userId,
            res_id: resId
        }
    })

    //nếu chưa, thêm người dùng vào danh sách like (res_like)
    if (checkLike.length == 0) {
        let newData = {
            id: id,
            user_id: userId,
            res_id: resId,
            date_like: new Date()
        }
        await model.like_res.create(newData)
        return res.send(true)
    } else { //nếu đã like, xóa thông tin like trong danh sách res_like => unlike, trả kết quả false.
        await model.like_res.destroy({
            where: {
                user_id: userId,
                res_id: resId
            }
        })
    }
    res.send(false)
}

//lấy danh sách like theo nhà hàng
const getLikeRestaurant = async (req, res) => {

    let { resId } = req.params;

    let data = await model.like_res.findAll({
        where: {
            res_id: resId
        }
    })
    res.send(data)

}

//lấy danh sách like theo user
const getLikeRestaurantByUser = async (req, res) => {

    let { userId } = req.params;

    let data = await model.like_res.findAll({
        where: {
            user_id: userId
        }
    })
    res.send(data)

}

//xử lý đánh giá nhà hàng : thêm đấnh giá

const rateRes = async (req, res) => {
    let { userId } = req.params;
    let { resId, amountAdd } = req.body;

    //kiểm tra người dùng đã đánh giá nhà hàng chưa
    let checkRate = await model.rate_res.findAll({
        where: {
            user_id: userId,
            res_id: resId,
            amount: amountAdd
        }
    })
    //nếu chưa, hoặc khác amount, thêm thông tin vào danh sách rate_res
    if (checkRate.length == 0) {
        let newData = {
            user_id: userId,
            res_id: resId,
            amount: amountAdd,
            date_rate: new Date()
        }
        await model.rate_res.create(newData)
        return res.send(newData)
    } else { //nếu đã đánh giá và trùng amount, ko thêm vào.
        return res.send(true)
    }

}
//lấy danh sách like theo nhà hàng
const getRateRes = async (req, res) => {
    let { resId } = req.params;
    let data = await model.rate_res.findAll({
        where: {
            res_id: resId
        }
    })
    res.send(data)
}
//lấy danh sách like theo user
const getRateResByUser = async (req, res) => {
    let { userId } = req.params;
    let data = await model.rate_res.findAll({
        where: {
            user_id: userId
        }
    })
    res.send(data)
}

export {
    getLikeRestaurant, getLikeRestaurantByUser, likeRes, rateRes, getRateRes, getRateResByUser
}