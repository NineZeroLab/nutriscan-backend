import { Request, Response } from "express";
import { addToSearchHistory } from "../repository/productRepository";
import { AuthRequest } from "../middleware/authMiddleware";

const BASE_URL = 'https://world.openfoodfacts.net/api/v2';

const getProductDetails = async (req: AuthRequest, res: Response): Promise<any> => {
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
        console.log(req.user?.uid)
        const data = await response.json()
        const result = await addToSearchHistory(req.user?.uid ?? "", productId)
        if (!result.success) {
            res.send({
                error: result.message?.toString()
            })
            return
        }

        res.send(data)
    } catch (e: any) {
        res.send(e.message)
    }
}

export default getProductDetails
