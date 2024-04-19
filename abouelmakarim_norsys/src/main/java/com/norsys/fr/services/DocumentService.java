package com.norsys.fr.services;

import com.norsys.fr.entities.Document;
import org.springframework.core.io.Resource;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface DocumentService {
    void deleteDocument(UUID id);
    void updateDocument(UUID id, Document document) throws FileAlreadyExistsException;
    Document getDocument(UUID id);
    List<Document> getAllDocuments();
    void saveDocument(Document document) throws NoSuchAlgorithmException, IOException;

    List<Document> searchDocuments(String name, String type, LocalDate creationDate, Map<String, String> metadata);

    Resource downloadDocument(UUID id) throws FileNotFoundException;
}
