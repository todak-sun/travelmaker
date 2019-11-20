package com.travelmaker.store.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.store.dao.StoreDAO;
import com.travelmaker.store.domain.StoreHotelDTO;

@Service(value = "storeService")
public class StoreServiceImpl implements StoreService {
	@Autowired
	StoreDAO storeDAO;
	
	@Override
	public List<StoreHotelDTO> getHotelList() {
		return storeDAO.getHotelList();
	}

	@Override
	public StoreHotelDTO getHotelView(String hnb) {
		return storeDAO.getHotelView(hnb);
	}

}
