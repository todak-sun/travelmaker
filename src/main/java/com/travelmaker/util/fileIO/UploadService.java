package com.travelmaker.util.fileIO;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.context.ServletContextAware;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

@Component
public class UploadService implements ServletContextAware {
	// 엑세스키
	private static final String accessKey = "";
	// 보안 엑세스키
	private static final String secretKey = "";
	// Amazon S3 버킷 이름
	private static final String bucketName = "travelmaker-bucket";
	
	// 엔드포인트 (AWS를 위한 진입점의 URL) - 아시아 태평양
	private Regions regions = Regions.AP_NORTHEAST_2;
	private ServletContext servletContext;
	
	// 파일 저장 경로
	@Override
	public void setServletContext(ServletContext servletContext) {
		this.servletContext = servletContext;
	}
	
	// 프로필 이미지
	public String upload(MultipartFile multipartFile, String temp) {
		System.out.println(servletContext.getRealPath("/resources/img"));
		
		// 이미지 식별자  생성
		UUID uuid = UUID.randomUUID();
		// 이미지 확장자 명
		String extension = FilenameUtils.getExtension(multipartFile.getOriginalFilename());
		// 업로드 할 새로운 이미지 이름
		String imageName = LocalDateTime.now().toString() + "_" + uuid + "." + extension;
		
		// 생성
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		// 각종 정보 등록
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(regions).build();
		
		// 한글이름때문에 파일 저장했다가 이름을 다시 정함.
		File file = new File(servletContext.getRealPath("/resources/img"), multipartFile.getOriginalFilename());
		try {
			FileCopyUtils.copy(multipartFile.getInputStream(), new FileOutputStream(file));
			file.renameTo(new File(servletContext.getRealPath("/resources/img") + "/test." + extension));
			
			// 해당 버킷으로 올릴 파일 등록
			PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, temp + "/" + imageName, file);
			// URL 이미지 접근을 위해 공개 설정
			putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
			
			// Amazon S3 서버로 이미지 업로드
			s3Client.putObject(putObjectRequest);
			// 저장한 이미지 삭제
			file.delete();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
//		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
//		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(regions).build();
//		
//		ObjectMetadata omd = new ObjectMetadata();
//		String imageName = null;
//		
//		try {
//			omd.setContentType(multipartFile.getName());
//			omd.setContentLength(multipartFile.getSize());
//			omd.setHeader("filename", multipartFile.getOriginalFilename());
//			
//			imageName = LocalDateTime.now().toString() + multipartFile.getOriginalFilename();
//			
//			PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, "profile/" + imageName, multipartFile.getInputStream(), omd);
//			putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
//			
//			s3Client.putObject(putObjectRequest);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		System.out.println("들어왔다 스발럼들아 " + imageName);
		
		return imageName;
	}
	public String[] upload(MultipartFile[] multipartFiles, String temp) {
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(regions).build();
		
		String[] imageName = null;
		
		for(int i = 0; i < multipartFiles.length; i++) {
			UUID uuid = UUID.randomUUID();
			String extension = FilenameUtils.getExtension(multipartFiles[i].getOriginalFilename());
			imageName[i] = LocalDateTime.now().toString() + "_" + uuid + "." + extension;
			
			File file = new File(servletContext.getRealPath("/resources/img/"), multipartFiles[i].getOriginalFilename());
			
			try {
				FileCopyUtils.copy(multipartFiles[i].getInputStream(), new FileOutputStream(file));
				file.renameTo(new File(servletContext.getRealPath("/resources/img/") + "test" + i + "." + extension));
				
				PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, temp + "/" + imageName, file);
				putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
				
				s3Client.putObject(putObjectRequest);
				file.delete();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return imageName;
	}
	// 삭제
	public void delete(String fileName, String temp) {
		// 생성
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		// 각종 정보 등록
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(regions).build();
		
		try {
			s3Client.deleteObject(new DeleteObjectRequest(bucketName + "/" + temp, fileName));
			System.out.println("끝냄");
		} catch (AmazonServiceException ase) {
			// TODO Auto-generated catch block
			ase.printStackTrace();
		} catch (AmazonClientException ace) {
			// TODO Auto-generated catch block
			ace.printStackTrace();
		}
	}
	
	// Essay Text 파일 업로드
	public void uploadTxt(File file, String temp, String fileName) {
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(regions).build();

		PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, temp + "/" + fileName, file);
		putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead);
		
		s3Client.putObject(putObjectRequest);
	}
	// Essay Text 파일 다운로드
	public String downloadTxt(String fileName, String temp) {
		AWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		AmazonS3 s3Client = AmazonS3ClientBuilder.standard().withCredentials(new AWSStaticCredentialsProvider(credentials)).withRegion(regions).build();
		S3Object object = s3Client.getObject(new GetObjectRequest(bucketName, temp + "/" + fileName));
		InputStream in = object.getObjectContent();
		BufferedReader reader = new BufferedReader(new InputStreamReader(in));
		StringBuffer sb = new StringBuffer();
		
		while(true) {
			try {
				String line = reader.readLine();
				if(line == null) break;
				
				sb.append(line);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		try {
			reader.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return sb.toString();
	}
}
