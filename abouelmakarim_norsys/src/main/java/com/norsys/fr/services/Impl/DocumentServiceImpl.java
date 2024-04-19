package com.norsys.fr.services.Impl;

import com.norsys.fr.entities.Document;
import com.norsys.fr.entities.Document_;
import com.norsys.fr.services.DocumentService;
import com.norsys.fr.repositories.DocumentRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.*;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;


@Service
public class DocumentServiceImpl implements DocumentService {
    @Value("${document.directory}")
    private String documentDirectory;

    private final EntityManager entityManager;
    private final DocumentRepository documentRepository;


    public DocumentServiceImpl(EntityManager entityManager, DocumentRepository documentRepository) {
        this.entityManager = entityManager;
        this.documentRepository = documentRepository;

    }

    @Override
    public void deleteDocument(UUID id) {
        Optional<Document> optionalDocument = documentRepository.findById(id);
        if (optionalDocument.isEmpty()) {
            throw new NoSuchElementException("Document not found");
        }
        Document document = optionalDocument.get();
        Path filePath = Paths.get(documentDirectory, document.getName());
        try {
            Files.delete(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + e.getMessage());
        }
        documentRepository.deleteById(id);
    }


    @Override
    public void updateDocument(UUID id, Document document) {
        Optional<Document> existingDocumentOptional = documentRepository.findById(id);
        if (existingDocumentOptional.isEmpty()) {
            throw new NoSuchElementException("Document not found");
        }
        Document existingDocument = existingDocumentOptional.get();
        existingDocument.setName(document.getName());
        existingDocument.setType(document.getType());
        existingDocument.setMetadata(document.getMetadata());
        documentRepository.save(existingDocument);
    }


    @Override
    public Document getDocument(UUID id) {
        return documentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Document not found"));
    }


    @Override
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }

    @Override
    public void saveDocument(Document document) throws NoSuchAlgorithmException, IOException {
        String newMetadataHash = calculateMetadataHash(document.getMetadata());
        Iterable<Document> existingDocuments = documentRepository.findAll();
        for (Document existingDocument : existingDocuments) {
            String existingMetadataHash = calculateMetadataHash(existingDocument.getMetadata());
            if (existingMetadataHash.equals(newMetadataHash)) {
                throw new FileAlreadyExistsException("Document with the same metadata already exists");
            }
        }
        Path filePath = Paths.get(documentDirectory, document.getName());
        Files.createFile(filePath);
        document.setCreationDate(LocalDate.now());
        documentRepository.save(document);
    }

    private String calculateMetadataHash(Map<String, String> metadata) throws NoSuchAlgorithmException {
        StringBuilder metadataString = new StringBuilder();
        List<String> sortedKeys = new ArrayList<>(metadata.keySet());
        Collections.sort(sortedKeys);
        for (String key : sortedKeys) {
            metadataString.append(key).append("=").append(metadata.get(key)).append(",");
        }
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hashBytes = digest.digest(metadataString.toString().getBytes(StandardCharsets.UTF_8));
        StringBuilder hexString = new StringBuilder();
        for (byte b : hashBytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    @Override
    public List<Document> searchDocuments(String name, String type, LocalDate creationDate, Map<String, String> metadata) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Document> criteriaQuery = criteriaBuilder.createQuery(Document.class);
        Root<Document> root = criteriaQuery.from(Document.class);
        Predicate predicate = criteriaBuilder.conjunction();
        if (name != null && !name.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get(Document_.name), "%" + name + "%"));
        }
        if (type != null && !type.isEmpty()) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get(Document_.type), type));
        }
        if (creationDate != null) {
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get(Document_.creationDate), creationDate));
        }
        if (metadata != null && !metadata.isEmpty()) {
            for (Map.Entry<String, String> entry : metadata.entrySet()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.join(Document_.metadata).get(entry.getKey()), entry.getValue()));
            }
        }
        criteriaQuery.where(predicate);
        TypedQuery<Document> typedQuery = entityManager.createQuery(criteriaQuery);
        return typedQuery.getResultList();
    }

    @Override
    public Resource downloadDocument(UUID id) throws FileNotFoundException {
        Optional<Document> documentOptional = documentRepository.findById(id);
        if (documentOptional.isEmpty()) {
            throw new NoSuchElementException("Document not found");
        }
        Document document = documentOptional.get();
        JSONObject metadataJson = new JSONObject();
        metadataJson.put("Name", document.getName());
        metadataJson.put("Type", document.getType());
        metadataJson.put("CreationDate", document.getCreationDate());
        metadataJson.put("Metadata", document.getMetadata());
        String metadataString = metadataJson.toString();
        byte[] metadataBytes = metadataString.getBytes(StandardCharsets.UTF_8);
        Path filePath = Paths.get(documentDirectory, document.getName());

        try {
            Files.write(filePath, metadataBytes);
        } catch (IOException e) {
            throw new FileNotFoundException("Failed to write metadata to file");
        }
        Resource resource = new FileSystemResource(filePath.toFile());
        if (!resource.exists()) {
            throw new FileNotFoundException("File not found");
        }
        return resource;
    }

}
