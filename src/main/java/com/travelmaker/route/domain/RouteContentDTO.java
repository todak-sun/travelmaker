package com.travelmaker.route.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RouteContentDTO {
	private int crno;
	private int rno;
	private String content;
	private double lat;
	private double lng;
	private String location;
	private String dateStart;
	private String dateEnd;
	private double score;
	private int fixed;
}
