package com.alphamail.api.assistants.infrastructure.entity;

import com.alphamail.api.user.infrastructure.entity.UserEntity;
import com.alphamail.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "temporary_schedule")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TemporaryScheduleEntity extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "name", length = 20)
    private String name;

    @Column(length = 50)
    private String description;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;


}
