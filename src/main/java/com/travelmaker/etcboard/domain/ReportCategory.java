package com.travelmaker.etcboard.domain;

public enum ReportCategory {
    ROUTE(1, "게시물/여행경로"),
    ESSAY(2, "게시물/여행에세이"),
    FRIEND(3, "커뮤니티/동행구하기"),
    PURCHASE(4, "커뮤니티/해외직구대행");

    private final int value;
    private final String description;

    ReportCategory(int value, String description){
        this.value = value;
        this.description = description;
    }

    public int getValue(){
        return value;
    }

    public String getDescription(){
        return description;
    }

    public static ReportCategory valueOf(int value){
        switch (value){
            case 1: return ROUTE;
            case 2: return ESSAY;
            case 3: return FRIEND;
            case 4: return PURCHASE;
            default: throw new AssertionError("존재하지 않는 카테고리");
        }
    }
}
