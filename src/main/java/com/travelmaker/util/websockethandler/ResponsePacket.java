package com.travelmaker.util.websockethandler;

import lombok.Data;

@Data
public class ResponsePacket {
	private String header;
	private String data;
	private int no;
	
	@Override
	public String toString() {
		return "{\"header\":\""+header+"\",\"data\":\""+data+"\",\"no\":"+no+"}";
	}
	
	
	
}
