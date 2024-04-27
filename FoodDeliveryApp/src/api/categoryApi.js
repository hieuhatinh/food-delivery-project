import axiosClient from './axiosClient'

const apiGetCategories = async ({ limit, skip }) => {
    try {
        let categoriesResult = await axiosClient.get(
            '/category/get-categories',
            {
                params: {
                    limit,
                    skip,
                },
            },
        )

        return categoriesResult.data.categories
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

const apiGetCategoriesName = async () => {
    try {
        let categoriesResult = await axiosClient.get(
            '/category/get-categories-name',
        )

        return categoriesResult.data.categoriesName
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export { apiGetCategories, apiGetCategoriesName }
