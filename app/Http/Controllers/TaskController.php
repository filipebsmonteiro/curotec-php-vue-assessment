<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct(private TaskService $taskService){
        $this->taskService = $taskService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $tasks = $this->taskService->list(
            $request->only(['category_id', 'sort_by', 'direction'])
        );

        return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
    //     dump('$request->all()');
    //     dd($request->all());
        $task = $this->taskService->create($request->all());
        return $task;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $task = $this->taskService->find($id);
        return $task;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, string $id)
    {
        $task = $this->taskService->update($id, $request->data());
        return $task;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->taskService->delete($id);
    }
}
