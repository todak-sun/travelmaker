package com.travelmaker.purchase.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PurchaseAdDTO {
	private int bno;
	private int pano;
	private String nickname;
	private String locations;
	private String content;
	private String dateStart;
	private String dateEnd;
	private String dateWrite;
}
