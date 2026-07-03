package com.example.taskTracker.service;

import com.example.taskTracker.dto.TimeEntryRequest;
import com.example.taskTracker.dto.TimeEntryResponse;

import java.util.List;

public interface TimeEntryService {

    TimeEntryResponse createTimeEntry(
            Long taskId,
            TimeEntryRequest request
    );

    List<TimeEntryResponse> getTimeEntries(Long taskId);

}