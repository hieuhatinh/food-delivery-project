import axiosClient from './axiosClient'

const apiGetCategories = async ({ limit }) => {
    try {
        let categoriesResult = await axiosClient.get(
            '/category/get-categories',
            {
                params: {
                    limit,
                },
            },
        )

        return categoriesResult.data.categories
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiGetCategories }
