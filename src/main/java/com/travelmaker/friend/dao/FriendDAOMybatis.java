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
			
			for(FriendRequestDTO friendRequestDTO : friendRouteDTO.getFriendRequestDTOs()) {
				friendRequestDTO.setNickname(sqlSession.selectOne("friendSQL.getRequestNickname", friendRequestDTO.getSeq()));
			}
		}
		return list;
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
	
	
	
	

}
