package com.example.taskTracker.repository;

import com.example.taskTracker.enums.PriorityEnum;
import com.example.taskTracker.enums.StatusEnum;
import com.example.taskTracker.entity.TaskEntity;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {

    Page<TaskEntity> findByStatusEnum(StatusEnum statusEnum, Pageable pageable);

    Page<TaskEntity> findByPriorityEnum(PriorityEnum priorityEnum, Pageable pageable);

    Page<TaskEntity> findByStatusEnumAndPriorityEnum(
            StatusEnum statusEnum,
            PriorityEnum priorityEnum,
            Pageable pageable
    );
}
