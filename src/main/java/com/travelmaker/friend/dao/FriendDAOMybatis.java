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
		return sqlSession.selectList("friendSQL.getList", map);
	}

	@Override
	public int setWrite(FriendDTO friendDTO) {
		sqlSession.insert("friendSQL.setWrite", friendDTO);
		return sqlSession.selectOne("friendSQL.getSelectFno", friendDTO.getSeq());
	}

	@Override
	public void setRouteWrite(FriendRouteDTO friendRouteDTO) {
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
		return sqlSession.selectOne("friendSQL.getView", Integer.parseInt(fno));
	}

	@Override
	public List<FriendRouteDTO> getRouteView(String fno) {
		List<FriendRouteDTO> list = sqlSession.selectList("friendSQL.getRouteView", Integer.parseInt(fno));
		
		for(FriendRouteDTO friendRouteDTO : list) {
			friendRouteDTO.setFriendRequestDTOs(sqlSession.selectList("friendSQL.getRequestView", friendRouteDTO.getFcno()));
		}
		return list;
	}

	@Override
	public void setRequestWrite(FriendRequestDTO friendRequestDTO) {
		sqlSession.insert("friendSQL.setRequestWrite", friendRequestDTO);
	}

}
