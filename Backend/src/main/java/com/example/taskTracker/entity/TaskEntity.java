package com.example.taskTracker.entity;

import com.example.taskTracker.enums.PriorityEnum;
import com.example.taskTracker.enums.StatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    private StatusEnum statusEnum;

    @Enumerated(EnumType.STRING)
    private PriorityEnum priorityEnum;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "taskEntity",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<TimeEntryEntity> timeEntries = new ArrayList<>();

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (statusEnum == null) {
            statusEnum = StatusEnum.TODO;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
