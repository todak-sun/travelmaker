package com.travelmaker.purchase.domain;

import lombok.Data;

@Data
public class PurchaseOrderDTO {
	private int prno;
	private int bno;
	private String nickname;
	private int requestUserSeq;
	private String productname;
	private int price;
	private int quantity;
	private String content;
	private int isPermit;
}
