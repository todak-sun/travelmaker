package com.travelmaker.friend.service;

import java.util.List;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

public interface FriendService {

	public List<FriendDTO> getList();

	public FriendDTO getView(String fno);

	public int setWrite(FriendDTO friendDTO);

	public void setRouteWrite(FriendRouteDTO friendRouteDTO);

	public void cancelWrite(String fno);

}
