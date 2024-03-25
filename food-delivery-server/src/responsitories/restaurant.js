import { RestautantModel } from '../models/index.js'

const getRestaurants = async ({ limit, state }) => {
    const restaurant = await RestautantModel.find({
        state: state ? state : { $exists: true },
    }).limit(limit)

    return { restaurant: { ...restaurant } }
}

export default { getRestaurants }
