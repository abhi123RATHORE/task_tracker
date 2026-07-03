package com.example.taskTracker.service;




import com.example.taskTracker.dto.TaskRequest;
import com.example.taskTracker.dto.TaskResponse;
import com.example.taskTracker.enums.PriorityEnum;
import com.example.taskTracker.enums.StatusEnum;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {

    TaskResponse createTask(TaskRequest request);

    Page<TaskResponse> getAllTasks(StatusEnum statusEnum,
                                   PriorityEnum priorityEnum,
                                   Pageable pageable);

    TaskResponse getTask(Long id);

    TaskResponse updateTask(Long id,
                            TaskRequest request);

    void deleteTask(Long id);

    TaskResponse updateStatus(Long id,
                              StatusEnum statusEnum);
}