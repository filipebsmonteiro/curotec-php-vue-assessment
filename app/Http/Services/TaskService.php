<?php

namespace App\Http\Services;

use App\Models\Task;

class TaskService
{
    public function list(array $filters = [])
    {
        $query = Task::with('categories')
            ->where('user_id', auth()->id());

        if (!empty($filters['category_id'])) {
            $query->whereHas('categories', function ($q) use ($filters) {
                $q->where('categories.id', $filters['category_id']);
            });
        }

        if (!empty($filters['sort_by'])) {
            $direction = $filters['direction'] ?? 'asc';
            $query->orderBy($filters['sort_by'], $direction);
        } else {
            $query->latest();
        }

        return $query->paginate(10)->withQueryString();
    }

    public function create(array $data): Task
    {
        return Task::create([
            ...$data,
            'user_id' => auth()->id()
        ]);
    }

    public function find(string $id): Task
    {
        return Task::findOrFail($id);
    }

    public function update(string $id, array $data): Task
    {
        $task = Task::findOrFail($id);
        $task->update($data);

        return $task;
    }

    public function delete(string $id): void
    {
        $task = Task::findOrFail($id);
        $task->delete();
    }
}
