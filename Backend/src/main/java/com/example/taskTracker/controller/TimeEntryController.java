package com.example.taskTracker.controller;

import com.example.taskTracker.dto.TimeEntryRequest;
import com.example.taskTracker.dto.TimeEntryResponse;
import com.example.taskTracker.service.TimeEntryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks/{taskId}/time-entries")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TimeEntryController {

    private final TimeEntryService timeEntryService;

    @PostMapping
    public ResponseEntity<TimeEntryResponse> create(
            @PathVariable Long taskId,
            @Valid @RequestBody TimeEntryRequest request
    ) {

        return ResponseEntity.ok(
                timeEntryService.createTimeEntry(taskId, request)
        );
    }

    @GetMapping
    public ResponseEntity<List<TimeEntryResponse>> getAll(
            @PathVariable Long taskId
    ) {

        return ResponseEntity.ok(
                timeEntryService.getTimeEntries(taskId)
        );
    }
}