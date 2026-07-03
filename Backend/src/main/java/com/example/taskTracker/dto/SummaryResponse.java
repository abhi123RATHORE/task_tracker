package com.example.taskTracker.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SummaryResponse {

    private Integer overallMinutes;

    private List<TaskSummaryResponse> tasks;

}