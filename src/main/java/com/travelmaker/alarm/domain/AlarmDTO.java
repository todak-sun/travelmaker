package com.travelmaker.alarm.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class AlarmDTO {
	private int ano;
	private String header;
	private int dataSeq;
	private int is_read;
	private Date alarmDate;
	private String sendUserId;
	private String sendUserFid;
	private String requestUserId;
	private String requestUserFid;
	private String content;
}
