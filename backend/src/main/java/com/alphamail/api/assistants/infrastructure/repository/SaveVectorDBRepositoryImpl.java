package com.alphamail.api.assistants.infrastructure.repository;
import com.alphamail.api.assistants.domain.repository.SaveVectorDBRepository;
import com.alphamail.api.assistants.domain.entity.VectorDB;
import com.alphamail.api.assistants.infrastructure.dto.VectorDBDTORequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Repository
public class SaveVectorDBRepositoryImpl implements SaveVectorDBRepository {

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String AI_ENDPOINT = "http://localhost:5000/sendmail";

    public VectorDBDTORequest sendEmailToAi(VectorDB vectorDB) {

        // 1. Set body (form-data)
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("thread_id", vectorDB.threadId());
        body.add("user_id", vectorDB.userId());
        body.add("email_content", vectorDB.emailContent());

        // 2. Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 3. Build request
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

        // 4. Send request
        ResponseEntity<VectorDBDTORequest> response = restTemplate.postForEntity(
                AI_ENDPOINT,
                requestEntity,
                VectorDBDTORequest.class
        );

        return response.getBody();
    }

}
