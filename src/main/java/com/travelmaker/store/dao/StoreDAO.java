package com.travelmaker.store.dao;

import java.util.List;

import com.travelmaker.store.domain.StoreHotelDTO;

public interface StoreDAO {

	public List<StoreHotelDTO> getHotelList();

	public StoreHotelDTO getHotelView(String hnb);

}
