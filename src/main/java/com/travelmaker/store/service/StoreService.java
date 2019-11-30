package com.travelmaker.store.service;

import java.util.List;
import java.util.Map;

import com.travelmaker.store.domain.StoreHotelDTO;

public interface StoreService {

	public List<StoreHotelDTO> getHotelList(Map<String, Integer> map);

	public StoreHotelDTO getHotelView(String hnb);

	public int getTotalA();

}
