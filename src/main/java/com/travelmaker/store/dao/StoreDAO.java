package com.travelmaker.store.dao;

import java.util.List;
import java.util.Map;

import com.travelmaker.store.domain.StoreHotelDTO;

public interface StoreDAO {

	public List<StoreHotelDTO> getHotelList(Map<String, Integer> map);

	public StoreHotelDTO getHotelView(String hnb);

	public int getTotalA();

}
