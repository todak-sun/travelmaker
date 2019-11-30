package com.travelmaker.store.dao;

import java.util.List;
<<<<<<< Updated upstream
import java.util.Map;
=======
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
	public List<StoreHotelDTO> getHotelList(Map<String, Integer> map) {
		return sqlSession.selectList("storeSQL.getHotelList", map);
	}

	@Override
	public int getTotalA() {
		return sqlSession.selectOne("storeSQL.getTotalA");
	}
	
	@Override
	public StoreHotelDTO getHotelView(String hnb) {
		StoreHotelDTO storeHotelDTO = sqlSession.selectOne("storeSQL.getHotelView", Integer.parseInt(hnb));
		List<StoreHotelImageDTO> imgList = sqlSession.selectList("storeSQL.getHotelImageView", Integer.parseInt(hnb));
		List<StoreHotelRoomDTO> roomList = sqlSession.selectList("storeSQL.getHotelRoomView", Integer.parseInt(hnb));
		
		storeHotelDTO.setImgList(imgList);
		storeHotelDTO.setRoomList(roomList);
=======
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
>>>>>>> Stashed changes
		
		return storeHotelDTO;
	}

}
