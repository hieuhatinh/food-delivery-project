import axiosClient from './axiosClient'

const apiSearchByName = async ({ searchValue }) => {
    try {
        let resultSearch = await axiosClient.get(`/search/meal`, {
            params: {
                searchValue,
            },
        })

        return resultSearch.data.meals
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiSearchByCategory = async ({ idCategory }) => {
    try {
        let resultSearch = await axiosClient.get(
            `/search/category/${idCategory}`,
        )

        return resultSearch.data.meals
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiSearchByName, apiSearchByCategory }
