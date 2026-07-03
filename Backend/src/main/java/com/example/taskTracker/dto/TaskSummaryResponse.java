package com.example.taskTracker.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskSummaryResponse {

    private Long taskId;

    private String title;

    private Integer totalMinutes;
}
