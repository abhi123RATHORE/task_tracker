package com.example.taskTracker.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeEntryResponse {

    private Long id;

    private Integer durationMinutes;

    private String note;

    private LocalDateTime loggedAt;

    private Long taskId;
}