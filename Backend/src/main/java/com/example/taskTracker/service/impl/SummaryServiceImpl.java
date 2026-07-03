package com.example.taskTracker.service.impl;

import com.example.taskTracker.dto.SummaryResponse;
import com.example.taskTracker.dto.TaskSummaryResponse;
import com.example.taskTracker.entity.TaskEntity;
import com.example.taskTracker.entity.TimeEntryEntity;
import com.example.taskTracker.repository.TaskRepository;
import com.example.taskTracker.repository.TimeEntryRepository;
import com.example.taskTracker.service.SummaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SummaryServiceImpl implements SummaryService {

    private final TaskRepository taskRepository;

    private final TimeEntryRepository timeEntryRepository;

    @Override
    public SummaryResponse getSummary() {

        List<TaskEntity> tasks = taskRepository.findAll();

        List<TaskSummaryResponse> taskSummaries = new ArrayList<>();

        int overallMinutes = 0;

        for (TaskEntity task : tasks) {

            List<TimeEntryEntity> entries =
                    timeEntryRepository.findByTaskEntity_Id(task.getId());

            int totalMinutes = entries.stream()
                    .mapToInt(TimeEntryEntity::getDurationMinutes)
                    .sum();

            overallMinutes += totalMinutes;

            taskSummaries.add(

                    TaskSummaryResponse.builder()
                            .taskId(task.getId())
                            .title(task.getTitle())
                            .totalMinutes(totalMinutes)
                            .build()

            );

        }

        return SummaryResponse.builder()
                .overallMinutes(overallMinutes)
                .tasks(taskSummaries)
                .build();

    }
}