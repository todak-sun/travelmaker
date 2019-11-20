package com.travelmaker.util.websockethandler;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class WebsocketHandler extends TextWebSocketHandler {
	private static Logger logger = LoggerFactory.getLogger(WebsocketHandler.class);
	private Map<WebSocketSession,String> sessionList = new HashMap<WebSocketSession,String>();

	// 클라이언트와 연결 이후에 실행되는 메서드
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		//System.out.println("**********afterConnectionEstablished************");
		//System.out.println("[EchoHandler]");
		//System.out.println("{" + session.getId() + "} 연결됨");
		//System.out.println("[HTTP 받아오고]");
		Map<String, Object> map = session.getAttributes();
		
		if(map.get("SPRING_SECURITY_CONTEXT")!=null) { //로그인 경우
			//원래 값
			String object2String = map.get("SPRING_SECURITY_CONTEXT").toString();
			//추출값
			String loginId = null;
			Pattern pattern = Pattern.compile("Username[:] (.*?)[;] ");
			Matcher matcher = pattern.matcher(object2String);
			while (matcher.find()) {
				loginId = matcher.group(1);
			    if(matcher.group(1) ==  null)
			    	break;
			}
			//System.out.println("로그인 세션 : "+loginId);
			//System.out.println("[세션MAP에 저장]");
			sessionList.put(session,loginId);
		}
		//System.out.println("세션 MAP : " + sessionList.size());
		
		/*
		 * Iterator<WebSocketSession> mapIter = sessionList.keySet().iterator();
		 * while(mapIter.hasNext()){ WebSocketSession key = mapIter.next(); Object value
		 * = sessionList.get( key );
		 * System.out.println("[Key : "+key+"] [value : "+value+"]"); }
		 */
	}

	// 클라이언트가 서버로 메시지를 전송했을 때 실행되는 메서드
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		//System.out.println("***********handleTextMessage***********");
		//System.out.println("{" + session.getId() + "}로 부터 {" + message.getPayload() + "} 받음");
		Iterator<WebSocketSession> mapIter = sessionList.keySet().iterator();
        while(mapIter.hasNext()){
        	WebSocketSession key = mapIter.next();
            Object value = sessionList.get(key);
            //System.out.println(key+" : "+value);
            //System.out.println("Message:"+message);
            //System.out.println("MessagePayload : "+message.getPayload());
            if(message.getPayload().equals(value)) {
            	key.sendMessage(new TextMessage(session.getId() + " : " + message.getPayload()));
            }
        }
		
	}

	// 클라이언트와 연결을 끊었을 때 실행되는 메소드
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//System.out.println("**************afterConnectionClosed*************");
		sessionList.remove(session);
		//System.out.println("{" + session.getId() + "} 연결끊김");
		//System.out.println("연결종료 후 MAP Size : "+sessionList.size());
	}
}