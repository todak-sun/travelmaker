package com.travelmaker.store.domain;

<<<<<<< Updated upstream
import lombok.Data;

@Data
public class StoreHotelImageDTO {
	private int inb;
	private int hnb;
	private String imgUrls;
=======
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class StoreHotelImageDTO {
	private int inb;
	private int hnb;
	private String img_urls;
>>>>>>> Stashed changes
}
