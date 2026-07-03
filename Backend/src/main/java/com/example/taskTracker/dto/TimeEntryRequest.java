package com.example.taskTracker.dto;




import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeEntryRequest {

    @Min(value = 1, message = "Duration must be greater than 0")
    @Max(value = 480, message = "Maximum duration is 480 minutes")
    private Integer durationMinutes;

    @NotBlank(message = "Note is required")
    private String note;
}