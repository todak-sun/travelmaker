package com.travelmaker.purchase.service;

import com.travelmaker.purchase.dao.PurchaseDAO;
import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.util.fileIO.FileIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PurchaseImpleService implements PurchaseService {

    @Autowired
    private PurchaseDAO purchaseDAO;

    @Autowired
    private FileIO fileIO;

    @Override
    public List<PurchaseDTO> getList(Map<String, Integer> map) {

        System.out.println(map.get("startNum"));
        System.out.println(map.get("endNum"));

        return purchaseDAO.getList(map);
    }

    @Override
    public int getTotalA() {
        return purchaseDAO.getTotal();
    }

    @Override
    public int purchaseWrite(PurchaseDTO purchaseDTO) {
        String img = Optional.ofNullable(purchaseDTO.getImageFile())
                .map(imageFile -> fileIO.saveImage(imageFile))
				.orElse("tempImg");

        purchaseDTO.setImg(img);

        if (purchaseDTO.getCon() == 1) {
            purchaseDTO.setDateStart(purchaseDTO.getDateEnd());
        } else if (purchaseDTO.getCon() == 2) {
            purchaseDTO.setProductname("none");
            purchaseDTO.setPrice(0);
            purchaseDTO.setQuantity(0);
        }
        return purchaseDAO.purchaseRequestWrite(purchaseDTO);
    }

    @Override
    public PurchaseDTO getPurchaseDTO(String bno) {
        return purchaseDAO.getPurchaseDTO(bno);
    }

    @Override
    public void puchaseDelete(String bno) {
        purchaseDAO.puchaseDelete(bno);
    }

    @Override
    public void updatePurchase1(PurchaseDTO purchaseDTO) {
        purchaseDAO.updatePurchase1(purchaseDTO);
    }

    @Override
    public void updatePurchase2(PurchaseDTO purchaseDTO) {
        purchaseDAO.updatePurchase2(purchaseDTO);
    }


}

