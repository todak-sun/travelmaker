package com.travelmaker.purchase.service;

import com.travelmaker.purchase.dao.PurchaseDAO;
import com.travelmaker.purchase.domain.PurchaseDTO;
import com.travelmaker.user.dao.UserDAO;
import com.travelmaker.util.fileIO.FileIO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PurchaseImpleService implements PurchaseService {

    @Autowired
    private PurchaseDAO purchaseDAO;

    @Autowired
    private FileIO fileIO;

    @Autowired
    private UserDAO userDAO;

    @Override
    public List<PurchaseDTO> getList(Map<String, Integer> map) {

//        System.out.println(map.get("startNum"));
//        System.out.println(map.get("endNum"));
        List<PurchaseDTO> purchaseDTOList = new ArrayList<>();
        purchaseDAO.getList(map).forEach(purchaseDTO -> {
            purchaseDTO.setUser(userDAO.getUserDTO(purchaseDTO.getWriteUserSeq()));
            purchaseDTOList.add(purchaseDTO);
        });
        return purchaseDTOList;
    }

    @Override
    public int getTotalA() {
        return purchaseDAO.getTotal();
    }

    @Override
    public int purchaseWrite(PurchaseDTO purchaseDTO) {
        String temp = "purchase";
        String img = Optional.ofNullable(purchaseDTO.getImageFile())
                .map(imageFile -> fileIO.saveImage(imageFile, temp))
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
        String imageName = purchaseDAO.puchaseDelete(bno);
        String[] imageUrl = imageName.split("/");
        String temp = "purchase";

        fileIO.deleteImage(imageUrl[4], temp);
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

