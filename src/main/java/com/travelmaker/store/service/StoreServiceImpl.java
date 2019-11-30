package com.travelmaker.store.service;

import java.util.List;
<<<<<<< Updated upstream
import java.util.Map;
=======
>>>>>>> Stashed changes

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelmaker.store.dao.StoreDAO;
import com.travelmaker.store.domain.StoreHotelDTO;

@Service(value = "storeService")
public class StoreServiceImpl implements StoreService {
	@Autowired
	StoreDAO storeDAO;
	
	@Override
<<<<<<< Updated upstream
	public List<StoreHotelDTO> getHotelList(Map<String, Integer> map) {
		return storeDAO.getHotelList(map);
=======
	public List<StoreHotelDTO> getHotelList() {
		return storeDAO.getHotelList();
>>>>>>> Stashed changes
	}

	@Override
	public StoreHotelDTO getHotelView(String hnb) {
		return storeDAO.getHotelView(hnb);
	}

<<<<<<< Updated upstream
	@Override
	public int getTotalA() {
		return storeDAO.getTotalA();
	}

=======
>>>>>>> Stashed changes
}
