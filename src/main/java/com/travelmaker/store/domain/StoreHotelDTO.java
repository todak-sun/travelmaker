package com.travelmaker.store.domain;

import java.util.List;

<<<<<<< Updated upstream
import lombok.Data;

@Data
public class StoreHotelDTO {
	private int hnb;
	private String korName;
	private String engName;
=======
import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class StoreHotelDTO {
	private int hnb;
	private String kor_name;
	private String eng_name;
>>>>>>> Stashed changes
	private String star;
	private String address;
	private String price;
	private String content;
<<<<<<< Updated upstream
	private String mainImageUrl;
	private String mainUrl;
	private List<StoreHotelRoomDTO> roomList;
	private List<StoreHotelImageDTO> imgList;
=======
	private String main_image_url;
	private List<StoreHotelImageDTO> img_list;
	private List<StoreHotelRoomDTO> room_list;
>>>>>>> Stashed changes
}
