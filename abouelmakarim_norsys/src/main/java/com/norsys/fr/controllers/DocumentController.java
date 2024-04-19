package com.norsys.fr.controllers;

import org.springframework.core.io.Resource;
import com.norsys.fr.entities.Document;
import com.norsys.fr.services.Impl.DocumentServiceImpl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;



@RestController
@RequestMapping("/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {
    private final DocumentServiceImpl documentServiceImpl;

    public DocumentController(DocumentServiceImpl documentServiceImpl) {
        this.documentServiceImpl = documentServiceImpl;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Document>> getAllDocuments() {
        return ResponseEntity.ok(documentServiceImpl.getAllDocuments());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocument(@PathVariable("id") UUID id) {
        try {
            return ResponseEntity.ok(documentServiceImpl.getDocument(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<String> addDocument(@RequestBody Document request) {
        try {
            documentServiceImpl.saveDocument(request);
            return ResponseEntity.ok("Document saved successfully");
        } catch (FileAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed to add document: A document with the same name already exists");
        } catch (NoSuchAlgorithmException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add document: " + e.getMessage());
        }
    }
    @GetMapping("/search")
    public ResponseEntity<List<Document>> searchDocuments(@RequestParam(value = "name", required = false) String name,
                                                          @RequestParam(value = "type", required = false) String type,
                                                          @RequestParam(value = "creationDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate creationDate,
                                                          @RequestParam(value = "metadata", required = false) Map<String, String> metadata) {
        try {
            List<Document> documents = documentServiceImpl.searchDocuments(name, type, creationDate, metadata);
            return ResponseEntity.ok(documents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable("id") UUID id) {
        try {
            Resource file = documentServiceImpl.downloadDocument(id);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }



    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateDocument(@PathVariable("id") UUID id, @RequestBody Document request){
        try {
            documentServiceImpl.updateDocument(id, request);
            return ResponseEntity.ok("Document updated successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to update document: " + e.getMessage());
        }
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDocument(@PathVariable("id") UUID id) {
        try {
            documentServiceImpl.deleteDocument(id);
            return ResponseEntity.ok("Document deleted successfully");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Failed to delete document: " + e.getMessage());
        }
    }
}

