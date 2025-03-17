import { Request, Response } from "express";

const BASE_URL = 'https://world.openfoodfacts.net/api/v2';

const getProductDetails = async (req: Request, res: Response): Promise<any> => {
    try {
        const productId = req.params.productId

        const params = new URLSearchParams();

        const productFields = [
            'product_name',
            'code',
            'nutriments',
            'image_url'
        ]
        params.append('fields', productFields.join(','))

        const response = await fetch(`${BASE_URL}/product/${productId}?${params.toString()}`)
        const data = await response.json()
        res.send(data)
    } catch (e: any) {
        res.send(e.message)
    }
}

export default getProductDetails
