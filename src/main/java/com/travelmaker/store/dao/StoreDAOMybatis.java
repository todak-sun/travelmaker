package com.travelmaker.store.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.travelmaker.store.domain.StoreHotelDTO;
import com.travelmaker.store.domain.StoreHotelImageDTO;
import com.travelmaker.store.domain.StoreHotelRoomDTO;

@Repository("storeDAO")
@Transactional
public class StoreDAOMybatis implements StoreDAO {
	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public List<StoreHotelDTO> getHotelList() {
		return sqlSession.selectList("storeSQL.getHotelList");
	}

	@Override
	public StoreHotelDTO getHotelView(String hnb) {
		StoreHotelDTO storeHotelDTO = sqlSession.selectOne("storeSQL.getHotelView", Integer.parseInt(hnb));
		List<StoreHotelImageDTO> img_list = sqlSession.selectList("storeSQL.getHotelImageView", Integer.parseInt(hnb));
		List<StoreHotelRoomDTO> room_list = sqlSession.selectList("storeSQL.getHotelRoomView", Integer.parseInt(hnb));
		
		storeHotelDTO.setImg_list(img_list);
		storeHotelDTO.setRoom_list(room_list);
		
		return storeHotelDTO;
	}

}
