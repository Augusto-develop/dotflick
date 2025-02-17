import { mount } from '@vue/test-utils'
import FavoriteToogle from '@/components/layout/header/FavoriteToogle'

describe('FavoritesModal.vue', () => {
    it('open modal', async () => {
        const wrapper = mount(FavoriteToogle)

        await wrapper.find('.modalfavorite').trigger('click');
    })
})