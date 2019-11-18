package com.travelmaker.store.domain;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class StoreHotelDTO {
	private int hnb;
	private String kor_name;
	private String eng_name;
	private String star;
	private String address;
	private String price;
	private String content;
	private String main_image_url;
	private List<StoreHotelImageDTO> img_list;
	private List<StoreHotelRoomDTO> room_list;
}
