package com.travelmaker.store.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class StoreHotelRoomDTO {
	private int rnb;
	private int hnb;
	private String name;
	private int qty;
	private String img_url;
}
