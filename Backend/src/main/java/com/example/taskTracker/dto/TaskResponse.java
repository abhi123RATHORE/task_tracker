package com.example.taskTracker.dto;




import com.example.taskTracker.enums.PriorityEnum;
import com.example.taskTracker.enums.StatusEnum;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private StatusEnum statusEnum;
    private PriorityEnum priorityEnum;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}