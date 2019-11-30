package com.travelmaker.friend.dao;

import java.util.List;
import java.util.Map;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRequestDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

public interface FriendDAO {

	public List<FriendDTO> getList(Map<String, Integer> map);

	public int setWrite(FriendDTO friendDTO);
	
	public void setRouteWrite(FriendRouteDTO friendRouteDTO);

	public void cancelWrite(String fno);

	public int getTotalA();

	public FriendDTO getView(String fno);

	public List<FriendRequestDTO> getRequestView(String fcno);

	public void setRequestWrite(FriendRequestDTO friendRequestDTO);
	public FriendRequestDTO getFriendRequestDTO(int data);

	public FriendRouteDTO getFriendRouteDTO(int fcno);

	public FriendDTO getFriendDTO(int fno);

	public void requestAccept(String fccno);

	public void requestReject(String fccno);

	public void delete(Map<String, String> map);

	public FriendDTO modify(String fno);

	public void setModify(FriendDTO friendDTO);

	public List<FriendRouteDTO> getRouteModify(String fno);

	public void setRouteModify(FriendRouteDTO friendRouteDTO);


}
