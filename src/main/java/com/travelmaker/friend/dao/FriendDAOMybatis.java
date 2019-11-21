package com.travelmaker.friend.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.friend.domain.FriendDTO;
import com.travelmaker.friend.domain.FriendRouteDTO;

@Repository("friendDAO")
@Transactional
public class FriendDAOMybatis implements FriendDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<FriendDTO> getList() {
		return sqlSession.selectList("friendSQL.getList");
	}

	@Override
	public FriendDTO getView(String fno) {
		return sqlSession.selectOne("friendSQL.getView", Integer.parseInt(fno));
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

}
