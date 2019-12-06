
package com.travelmaker.cash.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@Data
@AllArgsConstructor
@Accessors(chain = true)
@Builder
@NoArgsConstructor
public class CashDTO {
    private int cno;
    private int type;
    private String requestUser;
    private int requestUserSeq;
    private String seller;
    private int sellerSeq;
    private int requestUserCheck;
    private int sellerCheck;
    private String productName;
    private int quantity;
    private	int price;
    private String applyNum;
    private String paidAt;
    private String cdate;
    private int prno;
}