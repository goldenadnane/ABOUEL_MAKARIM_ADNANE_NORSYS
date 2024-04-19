CREATE TABLE document (
                          id UUID PRIMARY KEY,
                          name VARCHAR(255),
                          type VARCHAR(255),
                          creation_date DATE
);

CREATE TABLE document_metadata (
                                   document_id UUID,
                                   metadata_key VARCHAR(255),
                                   metadata_value VARCHAR(255),
                                   FOREIGN KEY (document_id) REFERENCES document(id),
                                   PRIMARY KEY (document_id, metadata_key)
);
CREATE TABLE Users (
                       id UUID PRIMARY KEY,
                       username VARCHAR(255) NOT NULL
);

CREATE TABLE DocumentSharing (
                                 id UUID PRIMARY KEY,
                                 document_id UUID NOT NULL,
                                 sharedBy_id UUID NOT NULL,
                                 sharedWith_id UUID NOT NULL,
                                 accessLevel VARCHAR(255) NOT NULL,
                                 FOREIGN KEY (document_id) REFERENCES Document(id) ON DELETE CASCADE,
                                 FOREIGN KEY (sharedBy_id) REFERENCES Users(id) ON DELETE CASCADE,
                                 FOREIGN KEY (sharedWith_id) REFERENCES Users(id) ON DELETE CASCADE
);