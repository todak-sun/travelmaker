package com.travelmaker.purchase.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseDTO {
    private int bno;
    private String title;
    private String nickname;
    private String username;
    private int writeUserSeq;
    private String productname;
    private String img;
    private int price;
    private int quantity;
    private String location;
    private String content;
    private String dateWrite;
    private String dateStart;
    private String dateEnd;
    private int requestUserSeq;
    private String requestUsername;
    private int con;

    private MultipartFile imageFile;
}
