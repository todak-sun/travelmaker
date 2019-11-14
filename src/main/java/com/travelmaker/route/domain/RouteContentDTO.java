package com.travelmaker.route.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class RouteContentDTO {
	private int crno;
	private int rno;
	private String content;
	private double lat;
	private double lng;
	private String location; //국가명_도시명_장소명
	private String dateStart;
	private String dateEnd;
	private String score;
	private int fixed;
	private MultipartFile[] images;
	private List<String> imgs;
}