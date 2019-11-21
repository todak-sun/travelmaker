package com.travelmaker.friend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.friend.dao.FriendDAO;
import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

@Service("friendService")
public class FriendServiceImpl implements FriendService {
	@Autowired
	FriendDAO friendDAO;
	
	@Override
	public List<FriendDTO> getList() {
		return friendDAO.getList();
	}

	@Override
	public FriendDTO getView(String fno) {
		return friendDAO.getView(fno);
	}

	@Override
	public int setWrite(FriendDTO friendDTO) {
		return friendDAO.setWrite(friendDTO);		
	}

	@Override
	public void setRouteWrite(FriendRouteDTO friendRouteDTO) {
		friendDAO.setRouteWrite(friendRouteDTO);
	}

	@Override
	public void cancelWrite(String fno) {
		friendDAO.cancelWrite(fno);
	}

}
