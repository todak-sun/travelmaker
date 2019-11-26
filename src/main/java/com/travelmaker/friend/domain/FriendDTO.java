package com.travelmaker.friend.domain;

import java.sql.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatTypes;

import lombok.Data;

@Data
@Component
public class FriendDTO {
	private int fno;
	private int seq;
	private String id;
	private String title;
	private String is_domestic;
	private String dateStart;
	private String dateEnd;
	private int is_finish;
	private String kakao_chat;
	private String date_of_issue;
}
