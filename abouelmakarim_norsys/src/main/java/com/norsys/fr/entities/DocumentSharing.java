package com.norsys.fr.entities;

import com.norsys.fr.enums.AccessLevel;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocumentSharing {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private Document document;

    @ManyToOne
    private Users sharedBy;

    @ManyToOne
    private Users sharedWith;

    @Enumerated(EnumType.STRING)
    private AccessLevel accessLevel;
}
