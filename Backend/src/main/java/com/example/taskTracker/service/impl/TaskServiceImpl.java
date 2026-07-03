package com.example.taskTracker.service.impl;

import com.example.taskTracker.dto.TaskRequest;
import com.example.taskTracker.dto.TaskResponse;
import com.example.taskTracker.enums.PriorityEnum;
import com.example.taskTracker.enums.StatusEnum;
import com.example.taskTracker.entity.TaskEntity;
import com.example.taskTracker.exception.BusinessException;
import com.example.taskTracker.exception.ResourceNotFoundException;
import com.example.taskTracker.repository.TaskRepository;
import com.example.taskTracker.repository.TimeEntryRepository;
import com.example.taskTracker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, TimeEntryRepository timeEntryRepository) {
        this.taskRepository = taskRepository;
        this.timeEntryRepository = timeEntryRepository;
    }

    private final TaskRepository taskRepository;

    private final TimeEntryRepository timeEntryRepository;

    private TaskResponse mapToResponse(TaskEntity taskEntity){

        return TaskResponse.builder()
                .id(taskEntity.getId())
                .title(taskEntity.getTitle())
                .description(taskEntity.getDescription())
                .statusEnum(taskEntity.getStatusEnum())
                .priorityEnum(taskEntity.getPriorityEnum())
                .createdAt(taskEntity.getCreatedAt())
                .updatedAt(taskEntity.getUpdatedAt())
                .build();
    }
    @Override
    public TaskResponse createTask(TaskRequest request) {
        TaskEntity taskEntity = TaskEntity.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priorityEnum(request.getPriorityEnum())
                .statusEnum(StatusEnum.TODO)
                .build();

        taskRepository.save(taskEntity);

        return mapToResponse(taskEntity);
    }

    @Override
    public Page<TaskResponse> getAllTasks(StatusEnum statusEnum, PriorityEnum priorityEnum, Pageable pageable) {
        Page<TaskEntity> taskEntities;

        if(statusEnum != null && priorityEnum != null){
            taskEntities = taskRepository.findByStatusEnumAndPriorityEnum(statusEnum, priorityEnum, pageable);
        }
        else if(statusEnum != null){
            taskEntities = taskRepository.findByStatusEnum(statusEnum, pageable);
        }
        else if(priorityEnum != null){
            taskEntities = taskRepository.findByPriorityEnum(priorityEnum, pageable);
        }
        else{
            taskEntities = taskRepository.findAll(pageable);
        }

        return taskEntities.map(this::mapToResponse);
    }

    @Override
    public TaskResponse getTask(Long id) {

        TaskEntity taskEntity = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        return mapToResponse(taskEntity);
    }

    @Override
    public TaskResponse updateTask(Long id, TaskRequest request) {
        TaskEntity taskEntity = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        taskEntity.setTitle(request.getTitle());
        taskEntity.setDescription(request.getDescription());
        taskEntity.setPriorityEnum(request.getPriorityEnum());

        TaskEntity updatedTaskEntity = taskRepository.save(taskEntity);

        return mapToResponse(updatedTaskEntity);
    }

    @Override
    public void deleteTask(Long id) {
        TaskEntity taskEntity = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        if (timeEntryRepository.existsByTaskEntity_Id(id)) {
            throw new BusinessException(
                    "Task cannot be deleted because it has time entries."
            );
        }

        taskRepository.delete(taskEntity);
    }

    @Override
    public TaskResponse updateStatus(Long id, StatusEnum statusEnum) {
        TaskEntity taskEntity = taskRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found with id: " + id));

        StatusEnum currentStatusEnum = taskEntity.getStatusEnum();

        switch (currentStatusEnum) {

            case TODO -> {
                if (statusEnum != StatusEnum.IN_PROGRESS) {
                    throw new BusinessException(
                            "Task must move from TODO to IN_PROGRESS."
                    );
                }
            }

            case IN_PROGRESS -> {
                if (statusEnum != StatusEnum.DONE) {
                    throw new BusinessException(
                            "Task must move from IN_PROGRESS to DONE."
                    );
                }
            }

            case DONE -> {
                throw new BusinessException(
                        "Completed task cannot change status."
                );
            }
        }

        taskEntity.setStatusEnum(statusEnum);

        taskRepository.save(taskEntity);

        return mapToResponse(taskEntity);
    }
}