import { Repository } from './Base/Repository'


class CategoryRepository extends Repository {
    endpoint = 'categories'

}

export default new CategoryRepository()
