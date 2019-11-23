package com.travelmaker.friend.dao;

import java.util.List;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRequestDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

public interface FriendDAO {

	public List<FriendDTO> getList();

	public FriendDTO getView(String fno);

	public int setWrite(FriendDTO friendDTO);
	
	public void setRouteWrite(FriendRouteDTO friendRouteDTO);

	public void cancelWrite(String fno);

	public FriendRequestDTO getFriendRequestDTO(int data);

	public FriendRouteDTO getFriendRouteDTO(int fcno);

	public FriendDTO getFriendDTO(int fno);


}
