package com.norsys.fr.entities;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    private String type;


    @CreationTimestamp
    private LocalDate creationDate;

    @ElementCollection
    @MapKeyColumn(name = "metadata_key")
    @Column(name = "metadata_value")
    @CollectionTable(name = "document_metadata", joinColumns = @JoinColumn(name = "document_id"))
    private Map<String, String> metadata = new HashMap<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Document document = (Document) o;
        return Objects.equals(id, document.id) && Objects.equals(name, document.name) && Objects.equals(type, document.type) && Objects.equals(creationDate, document.creationDate) && Objects.equals(metadata, document.metadata);
    }



    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, creationDate, metadata);
    }

    public void addMetadata(String key, String value) {
        metadata.put(key, value);
    }


    public void removeMetadata(String key) {
        metadata.remove(key);
    }
}
