package com.example.taskTracker.service.impl;

import com.example.taskTracker.dto.TimeEntryRequest;
import com.example.taskTracker.dto.TimeEntryResponse;
import com.example.taskTracker.entity.TaskEntity;
import com.example.taskTracker.entity.TimeEntryEntity;
import com.example.taskTracker.exception.ResourceNotFoundException;
import com.example.taskTracker.repository.TaskRepository;
import com.example.taskTracker.repository.TimeEntryRepository;
import com.example.taskTracker.service.TimeEntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeEntryServiceImpl implements TimeEntryService {

    private final TimeEntryRepository timeEntryRepository;

    private final TaskRepository taskRepository;

    private TimeEntryResponse mapToResponse(TimeEntryEntity entity) {

        return TimeEntryResponse.builder()
                .id(entity.getId())
                .durationMinutes(entity.getDurationMinutes())
                .note(entity.getNote())
                .loggedAt(entity.getLoggedAt())
                .taskId(entity.getTaskEntity().getId())
                .build();
    }

    @Override
    public TimeEntryResponse createTimeEntry(Long taskId,
                                             TimeEntryRequest request) {

        // Find Task
        TaskEntity task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found with id: " + taskId));

        // Business Rule
        if (request.getDurationMinutes() <= 0) {
            throw new IllegalArgumentException(
                    "Duration must be greater than 0."
            );
        }

        if (request.getDurationMinutes() > 480) {
            throw new IllegalArgumentException(
                    "Duration cannot exceed 480 minutes (8 hours)."
            );
        }

        // Create Time Entry
        TimeEntryEntity entry = TimeEntryEntity.builder()
                .durationMinutes(request.getDurationMinutes())
                .note(request.getNote())
                .taskEntity(task)
                .build();

        TimeEntryEntity savedEntry = timeEntryRepository.save(entry);

        return mapToResponse(savedEntry);
    }

    @Override
    public List<TimeEntryResponse> getTimeEntries(Long taskId) {

        // Check Task Exists
        taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Task not found with id: " + taskId));

        return timeEntryRepository.findByTaskEntity_Id(taskId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
}