package com.example.taskTracker.repository;

import com.example.taskTracker.entity.TimeEntryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TimeEntryRepository extends JpaRepository<TimeEntryEntity, Long> {


    List<TimeEntryEntity> findByTaskEntity_Id(Long taskId);

    boolean existsByTaskEntity_Id(Long taskId);

}
