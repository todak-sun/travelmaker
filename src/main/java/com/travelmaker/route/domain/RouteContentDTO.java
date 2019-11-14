package com.travelmaker.route.domain;

<<<<<<< HEAD
=======
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

>>>>>>> 586671ae114d8b2a9c3d6a1660afc4ea93908b98
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 586671ae114d8b2a9c3d6a1660afc4ea93908b98
