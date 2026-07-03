package com.example.taskTracker.controller;

import com.example.taskTracker.dto.TaskRequest;
import com.example.taskTracker.dto.TaskResponse;
import com.example.taskTracker.enums.PriorityEnum;
import com.example.taskTracker.enums.StatusEnum;
import com.example.taskTracker.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    // Create Task
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskResponse createTask(
            @Valid @RequestBody TaskRequest request) {

        return taskService.createTask(request);
    }

    // Get All Tasks (Supports Filtering)
    @GetMapping
    public Page<TaskResponse> getAllTasks(

            @RequestParam(required = false)
            StatusEnum statusEnum,

            @RequestParam(required = false)
            PriorityEnum priorityEnum,
            
            @RequestParam(defaultValue = "0") int page,
            
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        return taskService.getAllTasks(statusEnum, priorityEnum, pageable);
    }

    // Get Task By Id
    @GetMapping("/{id}")
    public TaskResponse getTask(
            @PathVariable Long id) {

        return taskService.getTask(id);
    }

    // Update Task
    @PutMapping("/{id}")
    public TaskResponse updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request) {

        return taskService.updateTask(id, request);
    }

    // Delete Task
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(
            @PathVariable Long id) {

        taskService.deleteTask(id);
    }

    // Update Task Status
    @PatchMapping("/{id}/status")
    public TaskResponse updateStatus(
            @PathVariable Long id,
            @RequestParam StatusEnum statusEnum) {

        return taskService.updateStatus(id, statusEnum);
    }
}
