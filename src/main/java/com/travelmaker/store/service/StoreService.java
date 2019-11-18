package com.travelmaker.store.service;

import java.util.List;

import com.travelmaker.store.domain.StoreHotelDTO;

public interface StoreService {

	public List<StoreHotelDTO> getHotelList();

	public StoreHotelDTO getHotelView(String hnb);

}
