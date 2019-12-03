package com.travelmaker.friend.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRequestDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

@Repository("friendDAO")
@Transactional
public class FriendDAOMybatis implements FriendDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<FriendDTO> getList(Map<String, Integer> map) {
		sqlSession.delete("friendSQL.abnormalDelete");
		List<FriendDTO> list = sqlSession.selectList("friendSQL.getList", map);
		
		for(FriendDTO friendDTO : list) {
			friendDTO.setNickname(sqlSession.selectOne("friendSQL.getNickName", friendDTO.getSeq()));
			friendDTO.setCitys(sqlSession.selectList("friendSQL.getCitys", friendDTO.getFno()));
			System.out.println("city = " + friendDTO.getCitys());
		}
		return list;
	}

	@Override
	public int setWrite(FriendDTO friendDTO) {
		sqlSession.insert("friendSQL.setWrite", friendDTO);
		return sqlSession.selectOne("friendSQL.getSelectFno", friendDTO.getSeq());
	}

	@Override
	public void setRouteWrite(FriendRouteDTO friendRouteDTO) {
		if(friendRouteDTO.getDivision().equals("check")) {
			sqlSession.update("friendSQL.normalUpdate", friendRouteDTO.getFno());
		}
		sqlSession.insert("friendSQL.setRouteWrite", friendRouteDTO);
	}

	@Override
	public void cancelWrite(String fno) {
		sqlSession.delete("friendSQL.cancelWrite", Integer.parseInt(fno));
		sqlSession.delete("friendSQL.cancelRouteWrite", Integer.parseInt(fno));
	}

	@Override
	public int getTotalA() {
		return sqlSession.selectOne("friendSQL.getTotalA");
	}

	@Override
	public FriendDTO getView(String fno) {
		FriendDTO friendDTO = sqlSession.selectOne("friendSQL.getView", Integer.parseInt(fno));
		friendDTO.setFriendRouteDTOs(sqlSession.selectList("friendSQL.getRouteView", Integer.parseInt(fno)));
		
		return friendDTO;
	}

	@Override
	public List<FriendRequestDTO> getRequestView(String fcno) {
		return sqlSession.selectList("friendSQL.getRequestView", Integer.parseInt(fcno));
	}

	@Override
	public void setRequestWrite(FriendRequestDTO friendRequestDTO) {
		sqlSession.insert("friendSQL.setRequestWrite", friendRequestDTO);
	}
	public FriendRequestDTO getFriendRequestDTO(int data) {
		return sqlSession.selectOne("friendSQL.getFriendRequestDTO", data);
	}

	@Override
	public FriendRouteDTO getFriendRouteDTO(int fcno) {
		return sqlSession.selectOne("friendSQL.getFriendRouteDTO", fcno);
	}

	@Override
	public FriendDTO getFriendDTO(int fno) {
		return sqlSession.selectOne("friendSQL.getFriendDTO",fno);
	}

	@Override
	public void requestAccept(String fccno) {
		sqlSession.update("friendSQL.requestAccept", Integer.parseInt(fccno));
	}

	@Override
	public void requestReject(String fccno) {
		sqlSession.update("friendSQL.requestReject", Integer.parseInt(fccno));
	}

	@Override
	public void delete(Map<String, String> map) {
		sqlSession.delete("friendSQL.delete", Integer.parseInt(map.get("dataseq")));
		List<FriendRouteDTO> list = sqlSession.selectList("friendSQL.routeSelect", Integer.parseInt(map.get("dataseq")));
		sqlSession.delete("friendSQL.routeDelete", Integer.parseInt(map.get("dataseq")));
		
		for(FriendRouteDTO friendRouteDTO : list) {
			sqlSession.delete("friendSQL.requestDelete", friendRouteDTO.getFcno());
		}
		sqlSession.delete("alarmSQL.delete", map);
	}

	@Override
	public FriendDTO modify(String fno) {
		return sqlSession.selectOne("friendSQL.getFriendDTO", Integer.parseInt(fno));
	}

	@Override
	public void setModify(FriendDTO friendDTO) {
		sqlSession.update("friendSQL.setModify", friendDTO);
	}

	@Override
	public List<FriendRouteDTO> getRouteModify(String fno) {
		return sqlSession.selectList("friendSQL.getRouteModify", Integer.parseInt(fno));
	}

	@Override
	public void setRouteModify(FriendRouteDTO friendRouteDTO) {
		sqlSession.update("friendSQL.setRouteModify", friendRouteDTO);
	}

	@Override
	public void updateDivision(FriendRouteDTO friendRouteDTO) {
		sqlSession.update("friendSQL.normalUpdate", friendRouteDTO.getFno());
	}
}
