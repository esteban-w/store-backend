import {Order, OrderStore} from '../orders'

const store = new OrderStore()

describe('Order Model', () => {
    it('should have a getCurrentOrder method', () => {
        expect(store.getCurrentOrder).toBeDefined()
    })
})