import {OrderProductsStore} from '../order_products'

const store = new OrderProductsStore()

describe('Order Products Model', () => {
    it('should have a addProduct method', () => {
        expect(store.addProduct).toBeDefined()
    })
})