package com.alphamail.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;

@Configuration
public class AwsConfig {

	@Value("${aws.ses.system-sender}")
	private String systemEmail;

	@Value("${aws.region}")
	private String region;

	@Value("${aws.ses.access-key}")
	private String accessKey;

	@Value("${aws.ses.secret-key}")
	private String secretKey;

	public String getSystemEmailAddress() {
		return systemEmail;
	}

	@Bean
	public AmazonSimpleEmailService amazonSimpleEmailService() {
		return AmazonSimpleEmailServiceClientBuilder.standard()
			.withRegion(region)
			.withCredentials(new AWSStaticCredentialsProvider(
				new BasicAWSCredentials(accessKey, secretKey)))
			.build();
	}

	@Bean
	public AmazonS3 s3Client() {

		return AmazonS3ClientBuilder.standard()
			.withCredentials(new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey)))
			.withRegion(Regions.fromName(region))
			.build();
	}

}
