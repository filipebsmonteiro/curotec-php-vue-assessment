<?php

namespace App\Http\Services;

use App\Models\Task;
use App\Models\TaskHistory;
use Illuminate\Support\Facades\Auth;

class TaskHistoryService
{
    public static function log(Task $task, string $action, array $changes = [])
    {
        TaskHistory::create([
            'task_id' => $task->id,
            'user_id' => Auth::id(),
            'action'  => $action,
            'changes' => $changes,
        ]);
    }
}
