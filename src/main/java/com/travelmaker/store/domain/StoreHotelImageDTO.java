package com.travelmaker.store.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class StoreHotelImageDTO {
	private int inb;
	private int hnb;
	private String img_urls;
}
