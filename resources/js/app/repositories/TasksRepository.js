import { Repository } from './Base/Repository'


class TasksRepository extends Repository {
    endpoint = 'tasks'

}

export default new TasksRepository()
