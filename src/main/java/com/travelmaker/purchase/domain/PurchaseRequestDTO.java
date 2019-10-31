package com.travelmaker.purchase.domain;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PurchaseRequestDTO {
	private int bno;
	private int prno;
	private String nickname;
	private String img;
	private int price;
	private int quantity;
	private String location;
	private String content;
	private String dateWrite;
	private String requestee;
}
