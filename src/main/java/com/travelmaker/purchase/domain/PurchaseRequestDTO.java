package com.travelmaker.purchase.domain;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class PurchaseRequestDTO {
	private int prno;
	private int bno;
	private String nickname;
	private String requestUserSeq;
	private String content;
	private int isPermit;
}
