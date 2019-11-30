package com.travelmaker.friend.service;

import java.util.List;
import java.util.Map;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRequestDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

public interface FriendService {

	public List<FriendDTO> getList(Map<String, Integer> map);

	public int setWrite(FriendDTO friendDTO);

	public void setRouteWrite(FriendRouteDTO friendRouteDTO);

	public void cancelWrite(String fno);

	public int getTotalA();

	public FriendDTO getView(String fno);

	public List<FriendRouteDTO> getRouteView(String fno);

	public void setRequestWrite(FriendRequestDTO friendRequestDTO);
	public FriendRequestDTO getFriendRequestDTO(int data);

	FriendRouteDTO getFriendRouteDTO(int fcno);

	FriendDTO getFriendDTO(int fno);

	public void requestAccept(String fccno);

	public void requestReject(String fccno);
}
