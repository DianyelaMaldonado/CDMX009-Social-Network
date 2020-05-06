import { publicPost } from '../src/functions/publicpoust.js'
import { addNewPost } from '../src/functions/publicpoust.js'



describe('addNewPost', () => {
    it('Debería poder agregar un post', () => {
        return addNewPost('Mi primer publicación')
        .then((post) => {
            expect(post).toBe('Mi primer publicación');
        })

    }) 
})