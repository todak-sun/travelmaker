package com.travelmaker.store.dao;

import java.util.List;
<<<<<<< Updated upstream
import java.util.Map;
=======
>>>>>>> Stashed changes

import com.travelmaker.store.domain.StoreHotelDTO;

public interface StoreDAO {

<<<<<<< Updated upstream
	public List<StoreHotelDTO> getHotelList(Map<String, Integer> map);

	public StoreHotelDTO getHotelView(String hnb);

	public int getTotalA();

=======
	public List<StoreHotelDTO> getHotelList();

	public StoreHotelDTO getHotelView(String hnb);

>>>>>>> Stashed changes
}
