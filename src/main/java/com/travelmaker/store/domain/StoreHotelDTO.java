package com.travelmaker.store.domain;

import java.util.List;

import lombok.Data;

@Data
public class StoreHotelDTO {
	private int hnb;
	private String korName;
	private String engName;
	private String star;
	private String address;
	private String price;
	private String content;
	private String mainImageUrl;
	private String mainUrl;
	private List<StoreHotelRoomDTO> roomList;
	private List<StoreHotelImageDTO> imgList;
}
